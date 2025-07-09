# Kubernetes Web Application with Chat and AI

A fault-tolerant web application deployed on Kubernetes, featuring a CMS, real-time chat system, and AI-powered face detection service.

## 🏗️ Architecture Overview

The application consists of three main components:

### 1. **Statamic CMS** (Content Management System)
- **Technology**: PHP 8.2 + Apache
- **Replicas**: 2
- **Port**: 80 (exposed via NodePort 30080)
- **Database**: MySQL 8.0
- **Purpose**: Main website hosting with integrated iframe applications

### 2. **Chat Application**
- **Backend**: Node.js + WebSocket
- **Frontend**: Vue.js
- **Proxy**: Nginx
- **Database**: MongoDB with ReplicaSet
- **Replicas**: 2 backend, 2 nginx, 1 frontend
- **Ports**: 88 (WebSocket), 90 (Frontend via NodePort 30090)

### 3. **AI Application** (Face Detection)
- **Backend**: Node.js + Express
- **Frontend**: Vue.js
- **Proxy**: Apache HTTP Server
- **Cloud Services**: Azure Blob Storage, Azure SQL Database, Azure Face API
- **Replicas**: 1 backend, 1 frontend
- **Port**: 8080 (via NodePort 30081)

## 🛠️ Technologies Used

### Core Technologies
- **Kubernetes**: Container orchestration
- **Docker**: Containerization
- **Node.js**: Backend runtime
- **Vue.js**: Frontend framework
- **PHP/Laravel**: CMS backend (Statamic)

### Databases & Storage
- **MongoDB**: Chat message storage with ReplicaSet
- **MySQL**: CMS content storage
- **Azure Blob Storage**: Image file storage
- **Azure SQL Database**: AI processing history

### Web Servers & Proxies
- **Apache HTTP Server**: Static file serving and reverse proxy
- **Nginx**: WebSocket proxy and load balancing

### Cloud Services
- **Azure Face API**: AI-powered face detection
- **Azure Blob Storage**: Persistent file storage
- **Azure SQL Database**: Structured data storage

## 📁 Project Structure

```
project/
├── cms-statamic/
│   ├── Dockerfile
│   ├── volum/                 # Persistent CMS content
│   └── content/               # Statamic site content
├── chat-app/
│   ├── chat-backend/
│   │   ├── Dockerfile
│   │   ├── server.js
│   │   └── package.json
│   ├── chat-frontend/
│   │   ├── Dockerfile
│   │   ├── src/App.vue
│   │   └── package.json
│   └── chat-nginx/
│       ├── Dockerfile
│       └── nginx.conf
├── IA-app/
│   ├── ai-backend/
│   │   ├── Dockerfile
│   │   ├── server.js
│   │   └── package.json
│   ├── ai-frontend/
│   │   ├── Dockerfile
│   │   ├── src/App.vue
│   │   └── package.json
│   └── ai-apache/
│       ├── Dockerfile
│       └── httpd.conf
└── k8s/
    ├── statamic-deployment.yaml
    ├── mysql-deployment.yaml
    ├── mongodb-deployment.yaml
    ├── chat-backend-deployment.yaml
    ├── chat-frontend-deployment.yaml
    ├── ai-backend-deployment.yaml
    ├── ai-frontend-deployment.yaml
    └── [various services and configs]
```

## 🚀 Deployment Instructions

### Prerequisites
- Kubernetes cluster (tested with microk8s)
- Docker registry (local registry at localhost:32000)
- Azure account with:
  - Face API service
  - Blob Storage account
  - SQL Database

### 1. Setup Azure Services

Create the following Azure resources:
- **Face API**: For face detection processing
- **Blob Storage**: Container named `images`
- **SQL Database**: With `requests` table

### 2. Build and Push Docker Images

```bash
# Build custom images
docker build -t localhost:32000/statamic ./cms-statamic
docker build -t localhost:32000/chat-backend ./chat-app/chat-backend
docker build -t localhost:32000/chat-frontend ./chat-app/chat-frontend
docker build -t localhost:32000/chat-nginx ./chat-app/chat-nginx
docker build -t localhost:32000/ai-backend ./IA-app/ai-backend
docker build -t localhost:32000/ai-frontend ./IA-app/ai-frontend
docker build -t localhost:32000/ai-apache ./IA-app/ai-apache

# Push to registry
docker push localhost:32000/statamic
docker push localhost:32000/chat-backend
docker push localhost:32000/chat-frontend
docker push localhost:32000/chat-nginx
docker push localhost:32000/ai-backend
docker push localhost:32000/ai-frontend
docker push localhost:32000/ai-apache
```

### 3. Configure Kubernetes Secrets

Create Azure credentials secret:
```bash
kubectl create secret generic azure-credentials \
  --from-literal=AZURE_STORAGE_CONNECTION_STRING="your_storage_connection_string" \
  --from-literal=AZURE_SQL_CONNECTION_STRING="your_sql_connection_string" \
  --from-literal=AZURE_VISION_ENDPOINT="your_face_api_endpoint" \
  --from-literal=AZURE_VISION_KEY="your_face_api_key"
```

### 4. Deploy Application

```bash
# Deploy all components with single command
kubectl apply -f k8s/
```

### 5. Access the Application

- **Main Website**: `http://your-node-ip:30080`
- **Chat Application**: `http://your-node-ip:30090`
- **AI Application**: `http://your-node-ip:30081`

## ⭐ Key Features

### Chat System
- **Real-time messaging** via WebSocket
- **Message persistence** in MongoDB
- **Multi-pod synchronization** using MongoDB Change Streams
- **Load balancing** across multiple backend replicas
- **User-friendly interface** with message history

### AI Face Detection
- **Image upload** to Azure Blob Storage
- **Face detection** using Azure Cognitive Services
- **Processing history** stored in Azure SQL Database
- **Responsive web interface** for file uploads
- **Secure credential management** via Kubernetes Secrets

### CMS Integration
- **Statamic CMS** for content management
- **Iframe integration** for chat and AI applications
- **Persistent content storage** via PersistentVolumes
- **MySQL backend** for CMS data

## 🔧 Technical Implementation Details

### High Availability & Scaling
- **StatefulSet** for MongoDB to ensure stable network identities
- **Deployment** with multiple replicas for stateless services
- **PersistentVolumes** for data persistence
- **NodePort services** for external access

### Multi-Stage Docker Builds
- **Optimized image sizes** using multi-stage builds
- **Separate build and runtime environments**
- **Efficient caching** for faster rebuilds

### MongoDB ReplicaSet Configuration
```javascript
// Automatic ReplicaSet initialization
rs.initiate({
  _id: 'rs0',
  members: [{ _id: 0, host: 'mongodb:27017' }]
});
```

### Real-time Synchronization
- **Change Streams** for cross-pod message synchronization
- **WebSocket connections** for instant message delivery
- **Automatic reconnection** handling

## 🔒 Security Features

- **Kubernetes Secrets** for sensitive data
- **Azure AD integration** for cloud services
- **Network policies** for inter-service communication
- **Encrypted connections** to Azure services

## 📊 Monitoring & Maintenance

### Health Checks
- Container readiness and liveness probes
- Service discovery via Kubernetes DNS
- Automatic pod restart on failure

### Data Persistence
- **PersistentVolumeClaims** for database storage
- **ConfigMaps** for configuration management
- **Volume mounts** for content persistence

## 🏃‍♂️ Running the Application

Once deployed, the application provides:

1. **Main CMS interface** accessible at port 30080
2. **Integrated chat system** embedded via iframe
3. **AI face detection tool** embedded via iframe
4. **Persistent data storage** across pod restarts
5. **Load-balanced services** for high availability

## 🐛 Troubleshooting

### Common Issues
- **Pod startup failures**: Check image availability in registry
- **Database connections**: Verify service DNS resolution
- **Azure services**: Confirm credentials and endpoints
- **Storage issues**: Check PVC binding status

### Useful Commands
```bash
# Check pod status
kubectl get pods

# View logs
kubectl logs <pod-name>

# Check services
kubectl get services

# Monitor deployments
kubectl get deployments
```


![image](https://github.com/user-attachments/assets/2c7cdcd2-88fc-4032-a428-7b84c5197e31)
![image](https://github.com/user-attachments/assets/3d64b563-6c17-4815-8996-b1f01600948f)
![image](https://github.com/user-attachments/assets/01cda712-51de-44fb-a24d-89374965c2fe)





## 📄 License

This project was developed as part of a Fault-Tolerant Systems course assignment, demonstrating Kubernetes deployment patterns and microservices architecture.
