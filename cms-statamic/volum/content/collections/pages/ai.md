---
id: 13dbc3ef-cb25-4cd4-b4bc-8bdad9fe2069
blueprint: page
title: 'Aplicație IA'
layout: default
url: /ai
author: bf467f3f-0106-456d-ba36-82efddc7b7bf
template: home
updated_by: bf467f3f-0106-456d-ba36-82efddc7b7bf
updated_at: 1745851957
---
<style>
  :root {
    --primary: #f1356d;
    --secondary: #6c5ce7;
    --dark: #2d3436;
    --light: #f5f6fa;
    --accent: #00cec9;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--dark);
    max-width: 1400px;
    margin: 0 auto;
    padding: 0;
    background-color: var(--light);
    min-height: 100vh;
  }
  
  .container {
    padding: 20px 40px;
  }
  
  .main-nav {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    padding: 15px 40px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .main-nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center;
  }
  
  .main-nav li {
    margin: 0 25px;
  }
  
  .main-nav a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 18px;
    transition: all 0.3s;
    padding: 8px 12px;
    border-radius: 4px;
  }
  
  .main-nav a:hover {
    background-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }
  
  .main-nav li.active a {
    background-color: rgba(255,255,255,0.3);
  }
  
  h1 {
    color: var(--dark);
    border-bottom: 3px solid var(--accent);
    padding-bottom: 12px;
    margin: 40px 0 30px;
    font-size: 2.5rem;
    text-align: center;
  }
  
  .page-description {
    text-align: center;
    font-size: 1.1rem;
    color: #636e72;
    max-width: 800px;
    margin: 0 auto 40px;
    line-height: 1.8;
  }
  
  .iframe-container {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    margin: 40px 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: none;
    position: relative;
    min-height: 650px;
    background: white;
  }
  
  .iframe-container iframe {
    width: 100%;
    height: 100%;
    min-height: 650px;
    border: none;
    display: block;
  }
  
  .loading-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    color: var(--dark);
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 60px 0;
  }
  
  .feature-card {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .feature-card h3 {
    color: var(--primary);
    margin-top: 0;
  }
  
  footer {
    background: var(--dark);
    color: white;
    text-align: center;
    padding: 30px;
    margin-top: 60px;
  }
  
  @media (max-width: 768px) {
    .main-nav ul {
      flex-direction: column;
      align-items: center;
    }
    
    .main-nav li {
      margin: 10px 0;
    }
    
    .iframe-container {
      min-height: 500px;
    }
  }
</style>

<nav class="main-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/chat">Chat</a></li>
    <li class="active"><a href="/ai">Aplicație IA</a></li>
  </ul>
</nav>

<div class="container">
  <h1>Aplicație Inteligență Artificială</h1>
  <p class="page-description">Explorează puterea inteligenței artificiale pentru a-ți rezolva problemele complexe și a automatiza procese.</p>
  
  <div class="iframe-container">
    <iframe src="http://74.225.172.83:30081" onload="this.style.opacity = 1"></iframe>
  </div>
</div>

<footer>
  <p>© 2023 Platforma Mea. Toate drepturile rezervate.</p>
</footer>