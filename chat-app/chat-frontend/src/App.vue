<template>
  <div class="chat-container">
    <h2>Chat</h2>
    <div class="input-section">
      <input v-model="username" placeholder="Username" />
      <input v-model="message" placeholder="Message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
    <ul class="message-list">
      <li v-for="msg in messages" :key="msg._id">
        [{{ new Date(msg.timestamp).toLocaleString() }}] {{ msg.username }}: {{ msg.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      username: '',
      message: '',
      messages: [],
      ws: null
    };
  },
  mounted() {
    this.ws = new WebSocket(`ws://${window.location.hostname}:30088`);
    this.ws.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === 'history') {
        this.messages = data.data;
      } else if (data.type === 'message') {
        this.messages.push(data.data);
      }
    };
  },
  methods: {
    sendMessage() {
      if (this.username && this.message) {
        this.ws.send(JSON.stringify({ username: this.username, message: this.message }));
        this.message = '';
      }
    }
  }
}
</script>

<style>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  padding: 5px;
  flex: 1;
}
button {
  padding: 5px 10px;
}
.message-list {
  list-style: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}
li {
  margin-bottom: 10px;
}
</style>