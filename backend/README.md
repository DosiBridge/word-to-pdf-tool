# Document Converter Backend

FastAPI backend for document conversion services.

## Installation

```bash
pip install -r requirements.txt
```

## Running

```bash
python main.py
```

Or with uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

- `POST /api/pdf-to-word` - Convert PDF to Word document
- `POST /api/word-to-pdf` - Convert Word document to PDF
- `POST /api/pdf-to-txt` - Convert PDF to text file
- `POST /api/pdf-unlock` - Remove password protection from PDF (optional password parameter)

