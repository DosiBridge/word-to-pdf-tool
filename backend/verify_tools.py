import requests
import os
from reportlab.pdfgen import canvas
from docx import Document

BASE_URL = "http://localhost:8000/api"

def create_test_files():
    print("Creating test files...")
    # Create PDF
    c = canvas.Canvas("test.pdf")
    c.drawString(100, 750, "Hello World PDF Test")
    c.showPage()
    c.drawString(100, 750, "Page 2")
    c.save()

    # Create Word Doc
    doc = Document()
    doc.add_paragraph("Hello World Word Test")
    doc.save("test.docx")
    print("Test files created.")

def test_pdf_to_word():
    print("\nTesting PDF to Word...")
    with open("test.pdf", "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/pdf-to-word", files=files)
    
    if response.status_code == 200:
        print("✅ PDF to Word: Success")
    else:
        print(f"❌ PDF to Word: Failed ({response.status_code}) - {response.text}")

def test_word_to_pdf():
    print("\nTesting Word to PDF...")
    with open("test.docx", "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/word-to-pdf", files=files)
    
    if response.status_code == 200:
        print("✅ Word to PDF: Success")
    else:
        print(f"❌ Word to PDF: Failed ({response.status_code}) - {response.text}")

def test_pdf_to_text():
    print("\nTesting PDF to Text...")
    with open("test.pdf", "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/pdf-to-txt", files=files)
    
    if response.status_code == 200:
        print("✅ PDF to Text: Success")
    else:
        print(f"❌ PDF to Text: Failed ({response.status_code}) - {response.text}")

def test_unlock_pdf():
    print("\nTesting Unlock PDF...")
    with open("test.pdf", "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/pdf-unlock", files=files)
    
    if response.status_code == 200:
        print("✅ Unlock PDF: Success")
    else:
        print(f"❌ Unlock PDF: Failed ({response.status_code}) - {response.text}")

def test_merge_pdfs():
    print("\nTesting Merge PDFs...")
    files = [
        ("files", ("test1.pdf", open("test.pdf", "rb"), "application/pdf")),
        ("files", ("test2.pdf", open("test.pdf", "rb"), "application/pdf"))
    ]
    response = requests.post(f"{BASE_URL}/merge-pdfs", files=files)
    
    # Close files
    for _, (_, f, _) in files:
        f.close()

    if response.status_code == 200:
        print("✅ Merge PDFs: Success")
    else:
        print(f"❌ Merge PDFs: Failed ({response.status_code}) - {response.text}")

def test_split_pdf():
    print("\nTesting Split PDF...")
    with open("test.pdf", "rb") as f:
        files = {"file": f}
        data = {"pages": "1"}
        response = requests.post(f"{BASE_URL}/split-pdf", files=files, data=data)
    
    if response.status_code == 200:
        print("✅ Split PDF: Success")
    else:
        print(f"❌ Split PDF: Failed ({response.status_code}) - {response.text}")

def cleanup():
    print("\nCleaning up...")
    if os.path.exists("test.pdf"): os.remove("test.pdf")
    if os.path.exists("test.docx"): os.remove("test.docx")
    print("Cleanup done.")

if __name__ == "__main__":
    try:
        create_test_files()
        test_pdf_to_word()
        test_word_to_pdf()
        test_pdf_to_text()
        test_unlock_pdf()
        test_merge_pdfs()
        test_split_pdf()
    except Exception as e:
        print(f"\n❌ An error occurred: {e}")
    finally:
        cleanup()
