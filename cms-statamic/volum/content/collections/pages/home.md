---
id: home
blueprint: pages
title: Home
template: default
author: bf467f3f-0106-456d-ba36-82efddc7b7bf
updated_by: bf467f3f-0106-456d-ba36-82efddc7b7bf
updated_at: 1745850523
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
  
  .hero {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, rgba(241,53,109,0.1), rgba(108,92,231,0.1));
    border-radius: 12px;
    margin: 40px 0;
  }
  
  .hero h2 {
    font-size: 2.2rem;
    color: var(--primary);
  }
  
  .hero p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
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
  
  .cta {
    text-align: center;
    margin: 50px 0;
  }
  
  .btn {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 12px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(241,53,109,0.3);
  }
  
  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(241,53,109,0.4);
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
  }
</style>

<nav class="main-nav">
  <ul>
    <li class="active"><a href="/">Home</a></li>
    <li><a href="/chat">Chat</a></li>
    <li><a href="/ai">Aplicație IA</a></li>
  </ul>
</nav>

<div class="container">
  <div class="hero">
    <h1>Bun venit pe platforma noastră!</h1>
    <p>Descoperă soluțiile noastre avansate de chat și inteligență artificială create pentru a-ți simplifica munca.</p>
  </div>

  <div class="features">
    <div class="feature-card">
      <h3>Chat în timp real</h3>
      <p>Comunică instant cu echipa ta sau cu clienții prin intermediul soluției noastre de chat performante.</p>
      <h3>Inteligență Artificială</h3>
      <p>Folosește puterea AI pentru a automatiza procese și a obține insights valoroase din date.</p>
    </div>

  </div>

</div>


<footer>
  <p>© 2023 Platforma Mea. Toate drepturile rezervate.</p>
</footer>