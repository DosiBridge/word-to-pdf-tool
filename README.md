# Document Converter

A full-stack document conversion application with a Next.js frontend and Python FastAPI backend.

## Features

- **PDF to Word**: Convert PDF documents to Word (.docx) format
- **Word to PDF**: Convert Word documents to PDF format
- **PDF to Text**: Extract text content from PDF files
- **PDF Unlocker**: Remove password protection from PDF files

## Project Structure

```
word-to-pdf/
├── backend/          # Python FastAPI backend
│   ├── main.py       # API endpoints
│   └── requirements.txt
├── frontend/         # Next.js frontend
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── lib/          # API utilities
└── README.md
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` if your backend is running on a different port:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

### Option 1: Docker Compose (Recommended)

The easiest way to run both services:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Or use the Makefile:
```bash
make start    # Build and start services
make logs      # View logs
make down      # Stop services
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Option 2: Manual Setup

1. Start the backend server (port 8000)
2. Start the frontend development server (port 3000)
3. Open your browser and navigate to `http://localhost:3000`
4. Select a file and click "Convert" to use any of the conversion tools

## API Endpoints

- `POST /api/pdf-to-word` - Convert PDF to Word document
- `POST /api/word-to-pdf` - Convert Word document to PDF
- `POST /api/pdf-to-txt` - Convert PDF to text file
- `POST /api/pdf-unlock` - Remove password protection from PDF (optional password parameter)

## Technologies

### Backend
- FastAPI
- PyPDF2 / pypdf
- python-docx
- pdf2docx
- PyMuPDF (fitz)

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

## Notes

- Files are processed temporarily and not stored on the server
- For Word to PDF conversion, formatting may be simplified
- PDF unlocker requires the password if the PDF is encrypted

