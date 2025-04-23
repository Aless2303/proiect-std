//dependintele necesare:
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { BlobServiceClient } = require('@azure/storage-blob');
const sql = require('mssql');
const axios = require('axios');
require('dotenv').config();

//configurari initiale necesare pentru
const app = express();
app.use(cors()); //pemite cereri de pe alte origini 
app.use(express.json()); //parseaza cererile cu json

const upload = multer({ dest: 'uploads/' }); //configureaza multer pentru a salva fisierele temporar in folderul uploads pe server 

//am configurat conexiunea la azure blobstorage
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient('images');


//am configurat conexiunea la azure sql database
const sqlConfig = {
    user: process.env.AZURE_SQL_CONNECTION_STRING.match(/User ID=([^;]+)/)[1],
    password: process.env.AZURE_SQL_CONNECTION_STRING.match(/Password=([^;]+)/)[1],
    server: process.env.AZURE_SQL_CONNECTION_STRING.match(/Server=tcp:([^,]+)/)[1],
    database: process.env.AZURE_SQL_CONNECTION_STRING.match(/Initial Catalog=([^;]+)/)[1],
    options: {
      encrypt: true,
      trustServerCertificate: false
    }
  };


//am gestionat cererile post pentru incarcarea imaginii (ruta)
//aceasta ruta defineste cand un client trimite o cerere http catre /upload 
app.post('/upload', upload.single('image'), async (req, res) => {
try {
    //verific fisierul
    //req.file este obiectul creat de multer continand delatii despre fisierul incarcat 
    const file = req.file;
    if (!file) {
    return res.status(400).json({ error: 'Niciun fișier nu a fost încărcat. Asigură-te că ai inclus un fișier în câmpul "image".' });
    }

    //incarcarea in azure blob storage 
    //creez un nume unic deoarece folosesc timestamp-ul +numele fisier
    const blobName = `${Date.now()}-${file.originalname}`;
    //obtin un client entru un blob specific din containerul images. 
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    //incarc fisierul pe blob storage
    await blockBlobClient.uploadFile(file.path);
    //obtin calea fisierului urcat anterior 
    //ex: https://blobstorageproiect.blob.core.windows.net/images/1697051234567-poza.jpg
    const imageUrl = blockBlobClient.url;

    // Apel HTTP catre Azure Face API
    const faceApiUrl = `${process.env.AZURE_VISION_ENDPOINT}/face/v1.0/detect?detectionModel=detection_01`;
    const response = await axios.post(faceApiUrl, { url: imageUrl }, {
    headers: {
        //am pus cheia cum as fi pus-o manual pe postman (cum am facut la laborator)
        'Ocp-Apim-Subscription-Key': process.env.AZURE_VISION_KEY,
        'Content-Type': 'application/json'
    }
    });
    const faces = response.data;

    //salvez in baza de date.
    const pool = await sql.connect(sqlConfig);
    await pool.request()
    .input('file_name', sql.NVarChar, file.originalname)
    .input('blob_url', sql.NVarChar, imageUrl)
    .input('timestamp', sql.DateTime, new Date())
    .input('result', sql.NVarChar, JSON.stringify(faces))
    .query(`
        INSERT INTO requests (file_name, blob_url, timestamp, result)
        VALUES (@file_name, @blob_url, @timestamp, @result)
    `);

    res.json({
    fileName: file.originalname,
    blobUrl: imageUrl,
    faces: faces
    });
} catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Eroare la procesare' });
}
});

app.get('/history', async (req, res) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query('SELECT * FROM requests ORDER BY timestamp DESC');
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Eroare la obținerea istoricului' });
  }
});

app.listen(3000, () => {
  console.log('AI Backend running on port 3000');
});