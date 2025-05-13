const WebSocket = require('ws');
const mongoose = require('mongoose');
const http = require('http');

// Creăm un server HTTP
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok' }));
  } else {
    res.statusCode = 404;
    res.end();
  }
});

// Conectare la MongoDB
mongoose.connect('mongodb://mongodb:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Definim schema pentru mesaje
const MessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// Creăm serverul WebSocket și îl atașăm la serverul HTTP
const wss = new WebSocket.Server({ server });

// Funcție pentru a distribui mesajul la toți clienții conectați la acest pod
function broadcastToClients(messageData) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'message', data: messageData }));
    }
  });
}

// Setăm change stream pentru a asculta noi mesaje
function setupChangeStream() {
  // Verificăm dacă conexiunea la MongoDB este gata
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection not ready, retrying in 1 second...');
    setTimeout(setupChangeStream, 1000);
    return;
  }
  
  try {
    console.log('Setting up MongoDB change stream...');
    
    // Creăm un change stream pentru colecția de mesaje
    const changeStream = Message.watch();
    
    // Ascultăm evenimentele de inserare
    changeStream.on('change', change => {
      if (change.operationType === 'insert') {
        console.log('New message detected via change stream:', change.fullDocument);
        
        // Distribuim mesajul la toți clienții conectați la acest pod
        broadcastToClients(change.fullDocument);
      }
    });
    
    changeStream.on('error', error => {
      console.error('Change stream error:', error);
      // Încercăm să reconectăm după o eroare
      setTimeout(setupChangeStream, 5000);
    });
    
    console.log('MongoDB change stream active, listening for new messages...');
  } catch (error) {
    console.error('Error setting up change stream:', error);
    // Încercăm să reconectăm
    setTimeout(setupChangeStream, 5000);
  }
}

// Când conexiunea MongoDB este deschisă, setăm change stream
mongoose.connection.once('open', () => {
  console.log('MongoDB connection open, setting up change stream...');
  setupChangeStream();
});

// Când un client se conectează
wss.on('connection', ws => {
  console.log('Client connected');
  
  // Când un client se conectează, trimitem mesajele existente
  Message.find().sort('timestamp').then(messages => {
    ws.send(JSON.stringify({ type: 'history', data: messages }));
  }).catch(err => {
    console.error('Error sending history:', err);
  });

  // Când primim un mesaj nou
  ws.on('message', async data => {
    try {
      const { username, message } = JSON.parse(data.toString());
      console.log(`Received message from ${username}: ${message}`);
      
      // Creăm și salvăm noul mesaj
      const newMessage = new Message({ username, message });
      await newMessage.save();
      
      // Nu mai facem broadcast direct la toți clienții aici
      // MongoDB change stream va detecta noul mesaj și va face broadcast
      
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Pornim serverul pe portul specificat
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});