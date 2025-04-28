---
id: 780eadef-e9fb-499f-b3f2-0eb8ea959a57
blueprint: page
title: Chat
layout: default
url: /chat
author: bf467f3f-0106-456d-ba36-82efddc7b7bf
template: default
updated_by: bf467f3f-0106-456d-ba36-82efddc7b7bf
updated_at: 1745785573
---
<style>
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .main-nav {
    background-color: #f1356d;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  
  .main-nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .main-nav li {
    margin-right: 20px;
  }
  
  .main-nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    transition: color 0.3s;
  }
  
  .main-nav a:hover {
    color: #e6e6e6;
  }
  
  h1 {
    color: #333;
    border-bottom: 2px solid #f1356d;
    padding-bottom: 10px;
    margin-top: 30px;
  }
  
  .iframe-wrapper {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin: 20px 0;
  }
  
  .iframe-wrapper iframe {
    width: 100%;
    height: 600px;
    border: none;
  }
</style>

<nav class="main-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/chat">Chat</a></li>
    <li><a href="/ai">Aplicație IA</a></li>
  </ul>
</nav>

# Chat
<div class="iframe-wrapper">
    <iframe src="http://localhost:30090"></iframe>
</div>