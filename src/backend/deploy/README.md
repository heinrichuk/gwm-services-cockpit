
# Deployment Instructions

This document outlines how to deploy the UBS Chat application in various environments.

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- pip and npm package managers

## Deployment Steps

### 1. Build the Frontend

From the project root:

```bash
# Install dependencies
npm install

# Build the React application
npm run build

# Copy the build files to the backend's static directory
mkdir -p src/backend/static
cp -r dist/* src/backend/static/
```

### 2. Deploy the Backend

#### Option 1: Deploy to a server (Ubuntu example)

```bash
# SSH into your server
ssh user@your-server

# Clone the repository (if not already done)
git clone <repository-url>
cd <repository-directory>

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
nano .env  # Add your Azure OpenAI credentials here

# Start the server (for testing)
cd src/backend
uvicorn main:app --host 0.0.0.0 --port 8000

# For production, use Gunicorn
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

#### Option 2: Deploy using Docker

Create a Dockerfile in the backend directory:

```dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run the Docker image:

```bash
docker build -t ubs-chat-app .
docker run -p 8000:8000 --env-file .env ubs-chat-app
```

#### Option 3: Deploy to Azure App Service

```bash
# Install Azure CLI
az login

# Create a resource group
az group create --name ubs-chat-rg --location eastus

# Create an App Service plan
az appservice plan create --name ubs-chat-plan --resource-group ubs-chat-rg --sku B1 --is-linux

# Create a web app
az webapp create --resource-group ubs-chat-rg --plan ubs-chat-plan --name ubs-chat-app --runtime "PYTHON:3.9"

# Configure environment variables
az webapp config appsettings set --resource-group ubs-chat-rg --name ubs-chat-app --settings AZURE_OPENAI_API_KEY=your_key_here AZURE_OPENAI_ENDPOINT=your_endpoint_here AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name_here

# Deploy the application
az webapp up --name ubs-chat-app --resource-group ubs-chat-rg
```
