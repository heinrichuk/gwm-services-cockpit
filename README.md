
# UBS Chat Assistant

A chat application with a UBS-themed interface, powered by a FastAPI backend and Azure OpenAI integration.

## Project Structure

- `/src` - Frontend React application
  - `/components` - React components
  - `/utils` - Utility functions
  - `/backend` - FastAPI backend application

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Backend
- FastAPI
- Python
- Azure OpenAI API

## Development Setup

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend

```bash
# Navigate to the backend directory
cd src/backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file with Azure OpenAI credentials
# Example:
# AZURE_OPENAI_API_KEY=your_key_here
# AZURE_OPENAI_ENDPOINT=your_endpoint_here
# AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name_here

# Start the FastAPI server
uvicorn main:app --reload
```

## Building for Production

```bash
# Build the React frontend
npm run build

# Copy the build output to the backend static directory
mkdir -p src/backend/static
cp -r dist/* src/backend/static/
```

## Deployment

See the detailed deployment instructions in `src/backend/deploy/README.md` for various deployment options including:

- Traditional server deployment
- Docker-based deployment
- Cloud platform deployment (Azure App Service)

## Features

- Chat interface with UBS branding and styling
- Message history storage
- Clear chat functionality
- Connection to Azure OpenAI for intelligent responses
- Support for RAG (Retrieval-Augmented Generation) based on document knowledge base

## License

This project is proprietary and confidential.

## Acknowledgements

- UBS for brand guidelines and styling
- Azure OpenAI for AI capabilities
- FastAPI for backend framework
- React for frontend framework
