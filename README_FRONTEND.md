**React frontend (replacement for Streamlit)**

Quick steps:

1. Start the API server (Python env activated):

```powershell
python -m pip install -r requirements.txt
python api_server.py
```

2. Start the React app:

```bash
cd frontend_react
npm install
npm run dev
```

The React app calls `http://127.0.0.1:8000/invoke` and `/resume`.
