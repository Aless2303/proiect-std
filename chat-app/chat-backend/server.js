const WebSocket = require('ws');
const mongoose = require('mongoose');

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

// Creăm serverul WebSocket
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', ws => {
  // Când un client se conectează, trimitem mesajele existente
  Message.find().sort('timestamp').then(messages => {
    ws.send(JSON.stringify({ type: 'history', data: messages }));
  });

  // Când primim un mesaj nou
  ws.on('message', async data => {
    const { username, message } = JSON.parse(data.toString());
    const newMessage = new Message({ username, message });
    await newMessage.save();

    // Trimitem mesajul la toți clienții conectați
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'message', data: newMessage }));
      }
    });
  });
});

console.log('WebSocket server running on port 3000');