<template>
  <div class="container">
    <h1>Aplicație AI - Detectare Fețe</h1>
    <div class="upload-section">
      <h2>Încarcă o imagine</h2>
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <button @click="uploadImage" :disabled="!file">Încarcă</button>
    </div>
    <div v-if="result" class="result-section">
      <h2>Rezultat:</h2>
      <p>Fișier: {{ result.fileName }}</p>
      <p>Număr fețe detectate: {{ result.faces.length }}</p>
      <ul>
        <li v-for="(face, index) in result.faces" :key="index">
          Față {{ index + 1 }}: Coordonate ({{ face.faceRectangle.left }}, {{ face.faceRectangle.top }})
        </li>
      </ul>
    </div>
    <div class="history-section">
      <h2>Istoric Cereri</h2>
      <ul>
        <li v-for="request in history" :key="request.id">
          {{ request.timestamp }} - {{ request.file_name }}: {{ JSON.parse(request.result).length }} fețe detectate
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      result: null,
      history: []
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async uploadImage() {
      const formData = new FormData();
      formData.append('image', this.file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        this.result = await response.json();
        this.fetchHistory();
      } catch (error) {
        console.error('Eroare la încărcare:', error);
      }
    },
    async fetchHistory() {
      try {
        const response = await fetch('/api/history');
        this.history = await response.json();
      } catch (error) {
        console.error('Eroare la obținerea istoricului:', error);
      }
    }
  },
  mounted() {
    this.fetchHistory();
  }
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.upload-section, .result-section, .history-section {
  margin-bottom: 20px;
}
input[type="file"] {
  margin-right: 10px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 5px 0;
}
</style>