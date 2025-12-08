import requests
import os
from reportlab.pdfgen import canvas

BASE_URL = "http://localhost:8000/api"

def create_test_pdf():
    c = canvas.Canvas("test_txt.pdf")
    c.drawString(100, 750, "Hello World PDF Test")
    c.save()

def test_pdf_to_txt():
    print("\nTesting PDF to Text...")
    with open("test_txt.pdf", "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/pdf-to-txt", files=files)
    
    if response.status_code == 200:
        print("✅ PDF to Text: Success")
        print(f"Content preview: {response.text[:50]}...")
    else:
        print(f"❌ PDF to Text: Failed ({response.status_code}) - {response.text}")

def cleanup():
    if os.path.exists("test_txt.pdf"): os.remove("test_txt.pdf")

if __name__ == "__main__":
    try:
        create_test_pdf()
        test_pdf_to_txt()
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cleanup()
