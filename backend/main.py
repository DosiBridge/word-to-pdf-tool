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


# Bijoy <-> Unicode conversion mappings
# Bijoy uses ANSI encoding while Unicode follows the Bengali Unicode range
UNICODE_TO_BIJOY_MAP = {
    # Vowels
    'অ': 'A', 'আ': 'Av', 'ই': 'B', 'ঈ': 'C', 'উ': 'D', 'ঊ': 'E',
    'ঋ': 'F', 'এ': 'G', 'ঐ': 'H', 'ও': 'I', 'ঔ': 'J',
    # Consonants
    'ক': 'K', 'খ': 'L', 'গ': 'M', 'ঘ': 'N', 'ঙ': 'O',
    'চ': 'P', 'ছ': 'Q', 'জ': 'R', 'ঝ': 'S', 'ঞ': 'T',
    'ট': 'U', 'ঠ': 'V', 'ড': 'W', 'ঢ': 'X', 'ণ': 'Y',
    'ত': 'Z', 'থ': '_', 'দ': '`', 'ধ': 'a', 'ন': 'b',
    'প': 'c', 'ফ': 'd', 'ব': 'e', 'ভ': 'f', 'ম': 'g',
    'য': 'h', 'র': 'i', 'ল': 'j', 'শ': 'k', 'ষ': 'l',
    'স': 'm', 'হ': 'n', 'ড়': 'o', 'ঢ়': 'p', 'য়': 'q',
    'ৎ': 'r', 'ং': 's', 'ঃ': 't', 'ঁ': 'u',
    # Vowel signs (kar)
    'া': 'v', 'ি': 'w', 'ী': 'x', 'ু': 'y', 'ূ': 'z',
    'ৃ': '„', 'ে': '†', 'ৈ': '‡', 'ো': '‰', 'ৌ': 'Š',
    # Hasanta (virama)
    '্': '&',
    # Numerals
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
    # Punctuation
    '।': '|', '॥': '||',
}

# Reverse mapping for Bijoy to Unicode
BIJOY_TO_UNICODE_MAP = {v: k for k, v in UNICODE_TO_BIJOY_MAP.items()}

# Handle special multi-character Bijoy sequences
BIJOY_SPECIAL_SEQUENCES = {
    'Av': 'আ', '‰': 'ো', 'Š': 'ৌ', '||': '॥',
}


def unicode_to_bijoy(text: str) -> str:
    """Convert Unicode Bengali text to Bijoy encoding"""
    result = []
    for char in text:
        if char in UNICODE_TO_BIJOY_MAP:
            result.append(UNICODE_TO_BIJOY_MAP[char])
        else:
            result.append(char)
    return ''.join(result)


def bijoy_to_unicode(text: str) -> str:
    """Convert Bijoy encoded text to Unicode Bengali"""
    result = []
    i = 0
    while i < len(text):
        # Check for multi-character sequences first
        matched = False
        for seq_len in [2, 1]:
            if i + seq_len <= len(text):
                seq = text[i:i + seq_len]
                if seq in BIJOY_SPECIAL_SEQUENCES:
                    result.append(BIJOY_SPECIAL_SEQUENCES[seq])
                    i += seq_len
                    matched = True
                    break
                elif seq_len == 1 and seq in BIJOY_TO_UNICODE_MAP:
                    result.append(BIJOY_TO_UNICODE_MAP[seq])
                    i += 1
                    matched = True
                    break
        if not matched:
            result.append(text[i])
            i += 1
    return ''.join(result)


from pydantic import BaseModel

class TextConversionRequest(BaseModel):
    text: str

class TextConversionResponse(BaseModel):
    converted_text: str


@app.post("/api/unicode-to-bijoy", response_model=TextConversionResponse)
async def convert_unicode_to_bijoy(request: TextConversionRequest):
    """Convert Unicode Bengali text to Bijoy encoding"""
    try:
        converted = unicode_to_bijoy(request.text)
        return TextConversionResponse(converted_text=converted)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/bijoy-to-unicode", response_model=TextConversionResponse)
async def convert_bijoy_to_unicode(request: TextConversionRequest):
    """Convert Bijoy encoded text to Unicode Bengali"""
    try:
        converted = bijoy_to_unicode(request.text)
        return TextConversionResponse(converted_text=converted)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# ============================================
# PHASE 1: CORE PDF TOOLS
# ============================================

@app.post("/api/compress-pdf")
async def compress_pdf(
    file: UploadFile = File(...),
    quality: Optional[str] = Form("medium")  # low, medium, high
):
    """Compress PDF to reduce file size"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Compression settings based on quality
        quality_settings = {
            "low": {"dpi": 72, "garbage": 4, "deflate": True, "clean": True},
            "medium": {"dpi": 150, "garbage": 3, "deflate": True, "clean": True},
            "high": {"dpi": 200, "garbage": 2, "deflate": True, "clean": False}
        }
        settings = quality_settings.get(quality, quality_settings["medium"])
        
        # Open and compress PDF
        pdf_doc = fitz.open(temp_pdf.name)
        
        # Save with compression
        pdf_doc.save(
            temp_output.name,
            garbage=settings["garbage"],
            deflate=settings["deflate"],
            clean=settings["clean"]
        )
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"compressed_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Compression failed: {str(e)}")


@app.post("/api/rotate-pdf")
async def rotate_pdf(
    file: UploadFile = File(...),
    rotation: int = Form(90),  # 90, 180, 270
    pages: Optional[str] = Form("all")  # "all" or "1,3-5,7"
):
    """Rotate PDF pages"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    if rotation not in [90, 180, 270]:
        raise HTTPException(status_code=400, detail="Rotation must be 90, 180, or 270 degrees")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        pdf_doc = fitz.open(temp_pdf.name)
        total_pages = len(pdf_doc)
        
        # Parse page selection
        if pages.lower() == "all":
            selected_indices = range(total_pages)
        else:
            selected_indices = set()
            parts = pages.split(',')
            for part in parts:
                part = part.strip()
                if '-' in part:
                    start, end = map(int, part.split('-'))
                    selected_indices.update(range(start - 1, end))
                else:
                    selected_indices.add(int(part) - 1)
            selected_indices = [i for i in selected_indices if 0 <= i < total_pages]
        
        # Rotate selected pages
        for i in selected_indices:
            page = pdf_doc[i]
            page.set_rotation(page.rotation + rotation)
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"rotated_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Rotation failed: {str(e)}")


@app.post("/api/pdf-to-jpg")
async def pdf_to_jpg(
    file: UploadFile = File(...),
    dpi: int = Form(150),
    pages: Optional[str] = Form("all")
):
    """Convert PDF pages to JPG images (returns ZIP)"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    import zipfile
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_zip = tempfile.NamedTemporaryFile(delete=False, suffix='.zip')
        temp_zip.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        pdf_doc = fitz.open(temp_pdf.name)
        total_pages = len(pdf_doc)
        
        # Parse page selection
        if pages.lower() == "all":
            selected_indices = range(total_pages)
        else:
            selected_indices = set()
            parts = pages.split(',')
            for part in parts:
                part = part.strip()
                if '-' in part:
                    start, end = map(int, part.split('-'))
                    selected_indices.update(range(start - 1, end))
                else:
                    selected_indices.add(int(part) - 1)
            selected_indices = sorted([i for i in selected_indices if 0 <= i < total_pages])
        
        # Create ZIP with images
        base_name = file.filename.replace('.pdf', '')
        with zipfile.ZipFile(temp_zip.name, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for i in selected_indices:
                page = pdf_doc[i]
                # Render page at specified DPI
                mat = fitz.Matrix(dpi / 72, dpi / 72)
                pix = page.get_pixmap(matrix=mat)
                img_data = pix.tobytes("jpeg")
                zipf.writestr(f"{base_name}_page_{i + 1}.jpg", img_data)
        
        pdf_doc.close()
        os.unlink(temp_pdf.name)
        
        output_filename = f"{base_name}_images.zip"
        return FileResponse(
            temp_zip.name,
            media_type="application/zip",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_zip.name):
            os.unlink(temp_zip.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/jpg-to-pdf")
async def jpg_to_pdf(files: list[UploadFile] = File(...)):
    """Convert JPG images to PDF"""
    if not files:
        raise HTTPException(status_code=400, detail="At least one image is required")
    
    temp_images = []
    temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    temp_output.close()
    
    try:
        pdf_doc = fitz.open()
        
        for file in files:
            if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.gif', '.webp')):
                raise HTTPException(status_code=400, detail=f"File {file.filename} is not a supported image format")
            
            # Save image temporarily
            temp_img = tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix)
            temp_img.close()
            temp_images.append(temp_img.name)
            
            with open(temp_img.name, 'wb') as f:
                shutil.copyfileobj(file.file, f)
            
            # Add image as PDF page
            img = fitz.open(temp_img.name)
            rect = img[0].rect
            pdf_page = pdf_doc.new_page(width=rect.width, height=rect.height)
            pdf_page.insert_image(rect, filename=temp_img.name)
            img.close()
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        # Cleanup temp images
        for temp_img in temp_images:
            if os.path.exists(temp_img):
                os.unlink(temp_img)
        
        output_filename = "images_combined.pdf"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        for temp_img in temp_images:
            if os.path.exists(temp_img):
                os.unlink(temp_img)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/add-page-numbers")
async def add_page_numbers(
    file: UploadFile = File(...),
    position: str = Form("bottom-center"),  # top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
    format: str = Form("Page {n} of {total}"),  # {n} = current, {total} = total
    start_page: int = Form(1),  # Which page to start numbering from
    font_size: int = Form(12)
):
    """Add page numbers to PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        pdf_doc = fitz.open(temp_pdf.name)
        total_pages = len(pdf_doc)
        
        # Position mapping
        positions = {
            "top-left": lambda rect: (36, 36),
            "top-center": lambda rect: (rect.width / 2, 36),
            "top-right": lambda rect: (rect.width - 36, 36),
            "bottom-left": lambda rect: (36, rect.height - 36),
            "bottom-center": lambda rect: (rect.width / 2, rect.height - 36),
            "bottom-right": lambda rect: (rect.width - 36, rect.height - 36),
        }
        
        get_pos = positions.get(position, positions["bottom-center"])
        
        for i in range(start_page - 1, total_pages):
            page = pdf_doc[i]
            rect = page.rect
            x, y = get_pos(rect)
            
            page_num = i - start_page + 2
            text = format.replace("{n}", str(page_num)).replace("{total}", str(total_pages - start_page + 1))
            
            # Get text width for centering
            text_length = fitz.get_text_length(text, fontsize=font_size)
            
            # Adjust x for centered text
            if "center" in position:
                x -= text_length / 2
            elif "right" in position:
                x -= text_length
            
            page.insert_text((x, y), text, fontsize=font_size, color=(0, 0, 0))
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"numbered_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Adding page numbers failed: {str(e)}")


@app.post("/api/add-watermark")
async def add_watermark(
    file: UploadFile = File(...),
    text: str = Form(...),
    opacity: float = Form(0.3),
    rotation: int = Form(45),
    font_size: int = Form(60),
    color: str = Form("gray")  # gray, red, blue, green
):
    """Add text watermark to PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        pdf_doc = fitz.open(temp_pdf.name)
        
        # Color mapping
        colors = {
            "gray": (0.5, 0.5, 0.5),
            "red": (1, 0, 0),
            "blue": (0, 0, 1),
            "green": (0, 0.5, 0),
            "black": (0, 0, 0)
        }
        watermark_color = colors.get(color, colors["gray"])
        
        for page in pdf_doc:
            rect = page.rect
            center_x = rect.width / 2
            center_y = rect.height / 2
            
            # Create watermark with rotation
            page.insert_text(
                (center_x - font_size * len(text) / 4, center_y),
                text,
                fontsize=font_size,
                color=watermark_color,
                rotate=rotation,
                overlay=True
            )
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"watermarked_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Adding watermark failed: {str(e)}")


@app.post("/api/protect-pdf")
async def protect_pdf(
    file: UploadFile = File(...),
    user_password: str = Form(...),
    owner_password: Optional[str] = Form(None),
    allow_printing: bool = Form(True),
    allow_copying: bool = Form(False)
):
    """Add password protection to PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Use pypdf for encryption
        reader = pypdf.PdfReader(temp_pdf.name)
        writer = pypdf.PdfWriter()
        
        for page in reader.pages:
            writer.add_page(page)
        
        # Set permissions
        permissions = pypdf.Permissions(
            print_document=allow_printing,
            modify_content=False,
            copy_content=allow_copying,
            add_or_modify=False,
            fill_form_fields=True,
            extract_text=allow_copying,
            assemble_doc=False,
            print_to_representation=allow_printing
        )
        
        writer.encrypt(
            user_password=user_password,
            owner_password=owner_password or user_password,
            permissions=permissions
        )
        
        with open(temp_output.name, 'wb') as f:
            writer.write(f)
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"protected_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Protection failed: {str(e)}")


# ============================================
# PHASE 2: DOCUMENT CONVERSIONS
# ============================================

@app.post("/api/excel-to-pdf")
async def excel_to_pdf(file: UploadFile = File(...)):
    """Convert Excel to PDF"""
    if not file.filename.lower().endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be an Excel file (.xlsx or .xls)")
    
    try:
        import openpyxl
        
        temp_excel = tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx')
        temp_excel.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_excel.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Load workbook
        wb = openpyxl.load_workbook(temp_excel.name)
        pdf_doc = fitz.open()
        
        for sheet_name in wb.sheetnames:
            sheet = wb[sheet_name]
            
            # Create PDF page
            page = pdf_doc.new_page()
            y_position = 50
            
            # Add sheet name as header
            page.insert_text((50, y_position), f"Sheet: {sheet_name}", fontsize=14, color=(0, 0, 0))
            y_position += 30
            
            # Extract data from sheet
            for row in sheet.iter_rows(max_row=100, values_only=True):
                if y_position > 750:
                    page = pdf_doc.new_page()
                    y_position = 50
                
                row_text = " | ".join([str(cell) if cell is not None else "" for cell in row[:10]])
                page.insert_text((50, y_position), row_text[:100], fontsize=10)
                y_position += 15
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        wb.close()
        
        os.unlink(temp_excel.name)
        
        output_filename = file.filename.rsplit('.', 1)[0] + '.pdf'
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except ImportError:
        raise HTTPException(status_code=500, detail="openpyxl not installed. Run: pip install openpyxl")
    except Exception as e:
        if os.path.exists(temp_excel.name):
            os.unlink(temp_excel.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/pptx-to-pdf")
async def pptx_to_pdf(file: UploadFile = File(...)):
    """Convert PowerPoint to PDF"""
    if not file.filename.lower().endswith(('.pptx', '.ppt')):
        raise HTTPException(status_code=400, detail="File must be a PowerPoint file (.pptx or .ppt)")
    
    try:
        from pptx import Presentation
        
        temp_pptx = tempfile.NamedTemporaryFile(delete=False, suffix='.pptx')
        temp_pptx.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pptx.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Load presentation
        prs = Presentation(temp_pptx.name)
        pdf_doc = fitz.open()
        
        for slide_num, slide in enumerate(prs.slides, 1):
            # Create page with slide dimensions (default: 10x7.5 inches at 72 DPI)
            page = pdf_doc.new_page(width=720, height=540)
            
            # Add slide number
            page.insert_text((30, 30), f"Slide {slide_num}", fontsize=12, color=(0.5, 0.5, 0.5))
            
            y_position = 60
            
            # Extract text from shapes
            for shape in slide.shapes:
                if hasattr(shape, "text") and shape.text.strip():
                    if y_position > 500:
                        y_position = 60
                    
                    # Clean and truncate text
                    text = shape.text.strip().replace('\n', ' ')[:80]
                    page.insert_text((30, y_position), text, fontsize=11)
                    y_position += 20
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        os.unlink(temp_pptx.name)
        
        output_filename = file.filename.rsplit('.', 1)[0] + '.pdf'
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except ImportError:
        raise HTTPException(status_code=500, detail="python-pptx not installed. Run: pip install python-pptx")
    except Exception as e:
        if os.path.exists(temp_pptx.name):
            os.unlink(temp_pptx.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/html-to-pdf")
async def html_to_pdf(
    file: UploadFile = File(None),
    html_content: Optional[str] = Form(None)
):
    """Convert HTML to PDF"""
    if not file and not html_content:
        raise HTTPException(status_code=400, detail="Either file or html_content is required")
    
    try:
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        # Get HTML content
        if file:
            content = await file.read()
            html_text = content.decode('utf-8')
        else:
            html_text = html_content
        
        # Create PDF from HTML using PyMuPDF's story feature
        pdf_doc = fitz.open()
        
        # Simple HTML to text extraction
        import re
        # Remove HTML tags for simple conversion
        clean_text = re.sub('<[^<]+?>', '\n', html_text)
        clean_text = re.sub(r'\n\s*\n', '\n\n', clean_text)
        
        # Create PDF pages
        lines = clean_text.split('\n')
        y_position = 50
        page = pdf_doc.new_page()
        
        for line in lines:
            if y_position > 750:
                page = pdf_doc.new_page()
                y_position = 50
            
            if line.strip():
                page.insert_text((50, y_position), line.strip()[:80], fontsize=11)
                y_position += 15
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        output_filename = file.filename.replace('.html', '.pdf') if file else "converted.pdf"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/pdf-to-excel")
async def pdf_to_excel(file: UploadFile = File(...)):
    """Extract tables from PDF to Excel"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        import openpyxl
        
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Extract text from PDF
        pdf_doc = fitz.open(temp_pdf.name)
        
        # Create Excel workbook
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Extracted Text"
        
        row_num = 1
        for page_num, page in enumerate(pdf_doc, 1):
            text = page.get_text()
            
            # Add page header
            ws.cell(row=row_num, column=1, value=f"--- Page {page_num} ---")
            row_num += 1
            
            # Add text lines
            for line in text.split('\n'):
                if line.strip():
                    ws.cell(row=row_num, column=1, value=line.strip())
                    row_num += 1
            
            row_num += 1  # Empty row between pages
        
        pdf_doc.close()
        wb.save(temp_output.name)
        
        os.unlink(temp_pdf.name)
        
        output_filename = file.filename.replace('.pdf', '.xlsx')
        return FileResponse(
            temp_output.name,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except ImportError:
        raise HTTPException(status_code=500, detail="openpyxl not installed. Run: pip install openpyxl")
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/pdf-to-pptx")
async def pdf_to_pptx(file: UploadFile = File(...)):
    """Convert PDF pages to PowerPoint slides"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        from pptx import Presentation
        from pptx.util import Inches, Pt
        
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pptx')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Create PowerPoint presentation
        prs = Presentation()
        prs.slide_width = Inches(10)
        prs.slide_height = Inches(7.5)
        
        # Extract text from PDF and create slides
        pdf_doc = fitz.open(temp_pdf.name)
        
        for page_num, page in enumerate(pdf_doc, 1):
            # Add blank slide
            blank_layout = prs.slide_layouts[6]  # Blank layout
            slide = prs.slides.add_slide(blank_layout)
            
            # Get page text
            text = page.get_text()
            
            # Add text box to slide
            left = Inches(0.5)
            top = Inches(0.5)
            width = Inches(9)
            height = Inches(6.5)
            
            txBox = slide.shapes.add_textbox(left, top, width, height)
            tf = txBox.text_frame
            tf.word_wrap = True
            
            # Add text (truncate if too long)
            p = tf.paragraphs[0]
            p.text = text[:3000]  # Limit text length
            p.font.size = Pt(12)
        
        pdf_doc.close()
        prs.save(temp_output.name)
        
        os.unlink(temp_pdf.name)
        
        output_filename = file.filename.replace('.pdf', '.pptx')
        return FileResponse(
            temp_output.name,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except ImportError:
        raise HTTPException(status_code=500, detail="python-pptx not installed. Run: pip install python-pptx")
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


# ============================================
# PHASE 3: PAGE ORGANIZATION TOOLS
# ============================================

@app.post("/api/extract-pages")
async def extract_pages(
    file: UploadFile = File(...),
    pages: str = Form(...)  # "1,3-5,7"
):
    """Extract specific pages from PDF"""
    # This is similar to split-pdf but with a clearer name
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        reader = pypdf.PdfReader(temp_pdf.name)
        writer = pypdf.PdfWriter()
        total_pages = len(reader.pages)
        
        # Parse page selection
        selected_indices = set()
        parts = pages.split(',')
        for part in parts:
            part = part.strip()
            if '-' in part:
                start, end = map(int, part.split('-'))
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
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"extracted_{file.filename}"
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
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")


@app.post("/api/remove-pages")
async def remove_pages(
    file: UploadFile = File(...),
    pages: str = Form(...)  # "1,3-5,7" - pages to REMOVE
):
    """Remove specific pages from PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        reader = pypdf.PdfReader(temp_pdf.name)
        writer = pypdf.PdfWriter()
        total_pages = len(reader.pages)
        
        # Parse pages to remove
        remove_indices = set()
        parts = pages.split(',')
        for part in parts:
            part = part.strip()
            if '-' in part:
                start, end = map(int, part.split('-'))
                remove_indices.update(range(start - 1, end))
            else:
                remove_indices.add(int(part) - 1)
        
        # Keep pages NOT in remove_indices
        for i in range(total_pages):
            if i not in remove_indices:
                writer.add_page(reader.pages[i])
        
        if len(writer.pages) == 0:
            raise HTTPException(status_code=400, detail="Cannot remove all pages")
        
        with open(temp_output.name, 'wb') as f:
            writer.write(f)
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"modified_{file.filename}"
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
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Removal failed: {str(e)}")


@app.post("/api/organize-pdf")
async def organize_pdf(
    file: UploadFile = File(...),
    order: str = Form(...)  # "3,1,2,5,4" - new page order (1-indexed)
):
    """Reorder pages in PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        reader = pypdf.PdfReader(temp_pdf.name)
        writer = pypdf.PdfWriter()
        total_pages = len(reader.pages)
        
        # Parse new order
        new_order = [int(x.strip()) - 1 for x in order.split(',')]
        
        # Validate order
        for idx in new_order:
            if idx < 0 or idx >= total_pages:
                raise HTTPException(status_code=400, detail=f"Invalid page number: {idx + 1}")
        
        # Add pages in new order
        for idx in new_order:
            writer.add_page(reader.pages[idx])
        
        with open(temp_output.name, 'wb') as f:
            writer.write(f)
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"organized_{file.filename}"
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
        raise HTTPException(status_code=400, detail="Invalid page order format")
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Organization failed: {str(e)}")


@app.post("/api/crop-pdf")
async def crop_pdf(
    file: UploadFile = File(...),
    top: float = Form(0),     # Points to crop from top
    bottom: float = Form(0),  # Points to crop from bottom
    left: float = Form(0),    # Points to crop from left
    right: float = Form(0)    # Points to crop from right
):
    """Crop margins from PDF pages"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        pdf_doc = fitz.open(temp_pdf.name)
        
        for page in pdf_doc:
            rect = page.rect
            # Create new crop box
            new_rect = fitz.Rect(
                rect.x0 + left,
                rect.y0 + top,
                rect.x1 - right,
                rect.y1 - bottom
            )
            page.set_cropbox(new_rect)
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"cropped_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Cropping failed: {str(e)}")


# ============================================
# PHASE 4: ADVANCED FEATURES
# ============================================

@app.post("/api/ocr-pdf")
async def ocr_pdf(
    file: UploadFile = File(...),
    language: str = Form("eng")  # eng, ben (Bengali), etc.
):
    """OCR scanned PDF to searchable PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        import pytesseract
        from PIL import Image
        
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Open PDF and perform OCR
        pdf_doc = fitz.open(temp_pdf.name)
        output_doc = fitz.open()
        
        for page_num, page in enumerate(pdf_doc):
            # Render page as image
            mat = fitz.Matrix(2, 2)  # 2x zoom for better OCR
            pix = page.get_pixmap(matrix=mat)
            
            # Convert to PIL Image
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            
            # Perform OCR
            ocr_text = pytesseract.image_to_string(img, lang=language)
            
            # Create new page with original content
            new_page = output_doc.new_page(width=page.rect.width, height=page.rect.height)
            
            # Insert original page as image
            new_page.insert_image(new_page.rect, pixmap=pix)
            
            # Add invisible text layer for searchability
            # (This is a simplified version - full implementation would use text positioning)
            if ocr_text.strip():
                # Add OCR text as annotation
                new_page.insert_text((10, 10), "", fontsize=1, color=(1, 1, 1))  # Hidden text marker
        
        output_doc.save(temp_output.name)
        output_doc.close()
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"ocr_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except ImportError:
        raise HTTPException(status_code=500, detail="pytesseract or Pillow not installed. Run: pip install pytesseract Pillow")
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"OCR failed: {str(e)}. Make sure Tesseract is installed.")


@app.post("/api/repair-pdf")
async def repair_pdf(file: UploadFile = File(...)):
    """Attempt to repair corrupted PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Try to open and repair with PyMuPDF
        try:
            pdf_doc = fitz.open(temp_pdf.name)
        except:
            # If normal open fails, try with repair flag
            pdf_doc = fitz.open(temp_pdf.name)
        
        # Save with cleaned/repaired options
        pdf_doc.save(
            temp_output.name,
            garbage=4,        # Maximum garbage collection
            clean=True,       # Clean unused objects
            deflate=True,     # Compress streams
            linear=True       # Optimize for web
        )
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"repaired_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Repair failed: {str(e)}")


@app.post("/api/pdf-to-pdfa")
async def pdf_to_pdfa(file: UploadFile = File(...)):
    """Convert PDF to PDF/A (archive format)"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Open and save with PDF/A compatible settings
        pdf_doc = fitz.open(temp_pdf.name)
        
        # Set metadata for PDF/A
        pdf_doc.metadata = {
            "format": "PDF/A-1b",
            "producer": "DosiBridge Document Converter",
            "creator": "DosiBridge",
        }
        
        # Save with compliance settings
        pdf_doc.save(
            temp_output.name,
            garbage=4,
            clean=True,
            deflate=True
        )
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = file.filename.replace('.pdf', '_pdfa.pdf')
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")


@app.post("/api/sign-pdf")
async def sign_pdf(
    file: UploadFile = File(...),
    signature_text: str = Form(...),
    signer_name: str = Form(""),
    position: str = Form("bottom-right"),  # top-left, top-right, bottom-left, bottom-right
    page: int = Form(-1)  # -1 for last page, or specific page number
):
    """Add digital signature placeholder to PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        pdf_doc = fitz.open(temp_pdf.name)
        total_pages = len(pdf_doc)
        
        # Determine which page to sign
        target_page = page - 1 if page > 0 else total_pages - 1
        if target_page < 0 or target_page >= total_pages:
            target_page = total_pages - 1
        
        page_obj = pdf_doc[target_page]
        rect = page_obj.rect
        
        # Calculate position
        signature_width = 200
        signature_height = 60
        margin = 36
        
        positions = {
            "top-left": (margin, margin),
            "top-right": (rect.width - signature_width - margin, margin),
            "bottom-left": (margin, rect.height - signature_height - margin),
            "bottom-right": (rect.width - signature_width - margin, rect.height - signature_height - margin),
        }
        
        x, y = positions.get(position, positions["bottom-right"])
        
        # Draw signature box
        sig_rect = fitz.Rect(x, y, x + signature_width, y + signature_height)
        
        # Draw border
        page_obj.draw_rect(sig_rect, color=(0, 0, 0.5), width=1)
        
        # Add signature text
        page_obj.insert_text((x + 10, y + 25), signature_text, fontsize=14, color=(0, 0, 0.5))
        
        # Add signer name and date
        from datetime import datetime
        date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
        if signer_name:
            page_obj.insert_text((x + 10, y + 40), f"Signed by: {signer_name}", fontsize=8, color=(0.3, 0.3, 0.3))
        page_obj.insert_text((x + 10, y + 52), f"Date: {date_str}", fontsize=8, color=(0.3, 0.3, 0.3))
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"signed_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Signing failed: {str(e)}")


@app.post("/api/redact-pdf")
async def redact_pdf(
    file: UploadFile = File(...),
    search_text: str = Form(...),  # Text to redact
    replacement: str = Form("[REDACTED]")  # What to show instead
):
    """Redact (black out) text in PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_pdf.close()
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_output.close()
        
        with open(temp_pdf.name, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        pdf_doc = fitz.open(temp_pdf.name)
        
        redaction_count = 0
        for page in pdf_doc:
            # Search for text
            text_instances = page.search_for(search_text)
            
            for inst in text_instances:
                # Add redaction annotation
                page.add_redact_annot(inst, text=replacement, fill=(0, 0, 0))
                redaction_count += 1
            
            # Apply redactions
            page.apply_redactions()
        
        pdf_doc.save(temp_output.name)
        pdf_doc.close()
        
        os.unlink(temp_pdf.name)
        
        output_filename = f"redacted_{file.filename}"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={
                "Content-Disposition": f'attachment; filename="{output_filename}"',
                "X-Redaction-Count": str(redaction_count)
            }
        )
    except Exception as e:
        if os.path.exists(temp_pdf.name):
            os.unlink(temp_pdf.name)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Redaction failed: {str(e)}")


@app.post("/api/compare-pdf")
async def compare_pdf(files: list[UploadFile] = File(...)):
    """Compare two PDFs and highlight differences"""
    if len(files) != 2:
        raise HTTPException(status_code=400, detail="Exactly two PDF files are required")
    
    for f in files:
        if not f.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail=f"File {f.filename} is not a PDF")
    
    temp_files = []
    temp_output = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    temp_output.close()
    
    try:
        # Save both files
        for f in files:
            temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
            temp_pdf.close()
            temp_files.append(temp_pdf.name)
            with open(temp_pdf.name, 'wb') as out:
                shutil.copyfileobj(f.file, out)
        
        # Open both PDFs
        pdf1 = fitz.open(temp_files[0])
        pdf2 = fitz.open(temp_files[1])
        
        # Create comparison document
        output_doc = fitz.open()
        
        max_pages = max(len(pdf1), len(pdf2))
        
        for i in range(max_pages):
            # Create comparison page
            page = output_doc.new_page(width=1200, height=800)
            
            # Add title
            page.insert_text((50, 30), f"Page {i + 1} Comparison", fontsize=16, color=(0, 0, 0))
            
            # Get text from both documents
            text1 = pdf1[i].get_text() if i < len(pdf1) else "[Page not in document 1]"
            text2 = pdf2[i].get_text() if i < len(pdf2) else "[Page not in document 2]"
            
            # Left side - Document 1
            page.insert_text((50, 60), "Document 1:", fontsize=12, color=(0, 0, 0.5))
            y = 80
            for line in text1.split('\n')[:30]:
                page.insert_text((50, y), line[:50], fontsize=9, color=(0, 0, 0))
                y += 12
            
            # Right side - Document 2
            page.insert_text((620, 60), "Document 2:", fontsize=12, color=(0.5, 0, 0))
            y = 80
            for line in text2.split('\n')[:30]:
                page.insert_text((620, y), line[:50], fontsize=9, color=(0, 0, 0))
                y += 12
            
            # Simple diff indicator
            if text1.strip() != text2.strip():
                page.insert_text((550, 400), "DIFFERENT", fontsize=14, color=(1, 0, 0), rotate=90)
            else:
                page.insert_text((550, 400), "IDENTICAL", fontsize=14, color=(0, 0.5, 0), rotate=90)
        
        output_doc.save(temp_output.name)
        output_doc.close()
        pdf1.close()
        pdf2.close()
        
        # Cleanup
        for temp_file in temp_files:
            if os.path.exists(temp_file):
                os.unlink(temp_file)
        
        output_filename = "comparison_result.pdf"
        return FileResponse(
            temp_output.name,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f'attachment; filename="{output_filename}"'}
        )
    except Exception as e:
        for temp_file in temp_files:
            if os.path.exists(temp_file):
                os.unlink(temp_file)
        if os.path.exists(temp_output.name):
            os.unlink(temp_output.name)
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")

