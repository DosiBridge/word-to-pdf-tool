from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import tempfile
import shutil
from pathlib import Path
from typing import Optional
import pypdf
from docx import Document
from pdf2docx import Converter
import fitz  # PyMuPDF
import io

app = FastAPI(title="Document Converter API")

# CORS middleware - read from environment variable or use defaults
cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in cors_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
async def root():
    return {"message": "Document Converter API"}


@app.post("/api/pdf-to-word")
async def pdf_to_word(file: UploadFile = File(...)):
    """Convert PDF to Word document"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Save uploaded file
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_docx = tempfile.NamedTemporaryFile(delete=False, suffix='.docx')
        temp_docx.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Convert PDF to DOCX
        cv = Converter(temp_pdf.name)
        cv.convert(temp_docx.name)
        cv.close()
        
        # Clean up PDF file
        os.unlink(temp_pdf.name)
        
        output_filename = file.filename.replace('.pdf', '.docx')
        return FileResponse(
            temp_docx.name,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        import traceback
        import sys
        traceback.print_exc(file=sys.stderr)

        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_docx.name):
            os.unlink(temp_docx.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/word-to-pdf")
async def word_to_pdf(file: UploadFile = File(...)):
    """Convert Word document to PDF"""
    if not file.filename.endswith(('.docx', '.doc')):
        raise HTTPException(status_code=400, detail="File must be a Word document (.docx or .doc)")
    
    try:
        # Save uploaded file
        temp_docx = tempfile.NamedTemporaryFile(delete=False, suffix='.docx')
        temp_docx.close()
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        
        with open(temp_docx.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Read Word document and create PDF
        doc = Document(temp_docx.name)
        
        # Create PDF using PyMuPDF
        pdf_doc = fitz.open()
        
        # Extract text from Word document (paragraphs and tables)
        content_parts = []
        
        # Extract paragraphs
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                content_parts.append(paragraph.text)
        
        # Extract tables
        for table in doc.tables:
            for row in table.rows:
                row_text = " | ".join([cell.text.strip() for cell in row.cells])
                if row_text.strip():
                    content_parts.append(row_text)
        
        full_text = "\n".join(content_parts)
        
        # Create PDF with proper pagination
        lines = full_text.split('\n')
        y_position = 50
        page_margin = 50
        line_height = 15
        max_y = 750
        
        page = pdf_doc.new_page()
        
        for line in lines:
            if y_position > max_y:
                page = pdf_doc.new_page()
                y_position = 50
            
            if line.strip():
                page.insert_text(
                    (page_margin, y_position),
                    line[:80],  # Limit line length
                    fontsize=11
                )
                y_position += line_height
        
        # Save PDF
        pdf_doc.save(temp_pdf.name)
        pdf_doc.close()
        
        # Clean up DOCX file
        os.unlink(temp_docx.name)
        
        output_filename = file.filename.replace('.docx', '.pdf').replace('.doc', '.pdf')
        return FileResponse(
            temp_pdf.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        import traceback
        import sys
        traceback.print_exc(file=sys.stderr)

        if os.path.exists(temp_docx.name):
            os.unlink(temp_docx.name)
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/pdf-to-txt")
async def pdf_to_txt(file: UploadFile = File(...)):
    """Convert PDF to text file"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Save uploaded file
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_txt = tempfile.NamedTemporaryFile(delete=False, suffix='.txt', mode='w')
        temp_txt.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Extract text from PDF using PyMuPDF
        pdf_doc = fitz.open(temp_pdf.name)
        text_content = []
        
        for page_num in range(len(pdf_doc)):
            page = pdf_doc[page_num]
            text_content.append(page.get_text())
        
        pdf_doc.close()
        
        # Write text to file
        full_text = "\n\n".join(text_content)
        with open(temp_txt.name, 'w', encoding='utf-8') as f:
            f.write(full_text)
        
        # Clean up PDF file
        os.unlink(temp_pdf.name)
        
        output_filename = file.filename.replace('.pdf', '.txt')
        return FileResponse(
            temp_txt.name,
            media_type="text/plain",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        import traceback
        import sys
        traceback.print_exc(file=sys.stderr)

        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_txt.name):
            os.unlink(temp_txt.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/pdf-unlock")
async def pdf_unlock(
    file: UploadFile = File(...),
    password: Optional[str] = Form(None)
):
    """Remove password protection from PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        # Save uploaded file
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_unlocked = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_unlocked.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Try to unlock PDF
        pdf_reader = pypdf.PdfReader(temp_pdf.name)
        
        # Check if PDF is encrypted
        if pdf_reader.is_encrypted:
            if password:
                pdf_reader.decrypt(password)
            else:
                # Try common empty password
                try:
                    pdf_reader.decrypt("")
                except:
                    raise HTTPException(
                        status_code=400,
                        detail="PDF is password protected. Please provide the password."
                    )
        
        # Create new PDF without encryption
        pdf_writer = pypdf.PdfWriter()
        
        for page in pdf_reader.pages:
            pdf_writer.add_page(page)
        
        # Don't encrypt - this removes encryption
        
        # Write unlocked PDF
        with open(temp_unlocked.name, 'wb') as f:
            pdf_writer.write(f)
        
        # Clean up original PDF
        os.unlink(temp_pdf.name)
        
        output_filename = f"unlocked_{file.filename}"
        return FileResponse(
            temp_unlocked.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except pypdf.errors.PdfReadError as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_unlocked.name):
            os.unlink(temp_unlocked.name)
        raise HTTPException(status_code=400, detail=f"Invalid PDF or incorrect password: {str(e)}")
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_unlocked.name):
            os.unlink(temp_unlocked.name)
        raise HTTPException(status_code=500, detail=f"Unlocking failed: {str(e)}")


@app.post("/api/merge-pdfs")
async def merge_pdfs(files: list[UploadFile] = File(...)):
    """Merge multiple PDFs into one"""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least two PDF files are required")
    
    temp_files = []
    temp_merged = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    
    try:
        merger = pypdf.PdfWriter()
        
        for file in files:
            if not file.filename.endswith('.pdf'):
                raise HTTPException(status_code=400, detail=f"File {file.filename} is not a PDF")
            
            temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
            temp_pdf.close()
            temp_files.append(temp_pdf.name)
            
            with open(temp_pdf.name, 'wb') as f:
                shutil.copyfileobj(file.file, f)
                
            merger.append(temp_pdf.name)
            
        merger.write(temp_merged.name)
        merger.close()
        
        # Clean up input files
        for temp_file in temp_files:
            if os.path.exists(temp_file):
                os.unlink(temp_file)
                
        output_filename = "merged_document.pdf"
        return FileResponse(
            temp_merged.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        # Clean up all temp files
        for temp_file in temp_files:
            if os.path.exists(temp_file):
                os.unlink(temp_file)
        if os.path.exists(temp_merged.name):
            os.unlink(temp_merged.name)
        raise HTTPException(status_code=500, detail=f"Merge failed: {str(e)}")


@app.post("/api/split-pdf")
async def split_pdf(
    file: UploadFile = File(...),
    pages: str = Form(...)  # Format: "1,3-5,7" or "all"
):
    """Split PDF or extract specific pages"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
        
    try:
        # Save uploaded file
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
            
        reader = pypdf.PdfReader(temp_pdf.name)
        writer = pypdf.PdfWriter()
        total_pages = len(reader.pages)
        
        if pages.lower() == "all":
            # Just copy the file if all pages requested (or maybe user wants to burst split? 
            # For now, let's assume extracting specific pages into a NEW pdf)
            # If "all", we might want to return a zip of single pages, but for simplicity let's just return the same pdf
            # Or better, let's interpret "all" as "extract all pages into one new PDF" which is same as original.
            # Let's support range extraction into a single PDF.
            selected_indices = range(total_pages)
        else:
            selected_indices = set()
            parts = pages.split(',')
            for part in parts:
                part = part.strip()
                if '-' in part:
                    start, end = map(int, part.split('-'))
                    # Adjust for 1-based indexing from user
                    selected_indices.update(range(start - 1, end))
                else:
                    selected_indices.add(int(part) - 1)
            
            selected_indices = sorted([i for i in selected_indices if 0 <= i < total_pages])
            
        if not selected_indices:
             raise HTTPException(status_code=400, detail="No valid pages selected")

        for i in selected_indices:
            writer.add_page(reader.pages[i])
            
        with open(temp_output.name, 'wb') as f:
            writer.write(f)
            
        # Clean up original
        os.unlink(temp_pdf.name)
        
        output_filename = f"split_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
        
    except ValueError:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=400, detail="Invalid page range format")
    except Exception as e:
        import traceback
        import sys
        traceback.print_exc(file=sys.stderr)
            
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Split failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

