
# UBS Chat Backend

This directory contains the FastAPI backend for the UBS Chat application.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install fastapi uvicorn python-dotenv azure-openai
```

3. Create a `.env` file in this directory with your Azure OpenAI credentials:
```
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_ENDPOINT=your_endpoint_here
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name_here
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

## Project Structure

- `main.py`: FastAPI application entry point
- `routes/`: API route definitions
- `services/`: Business logic services
- `models/`: Data models
- `.env`: Environment variables (not committed to git)
