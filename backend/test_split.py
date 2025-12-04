import requests
import os
from reportlab.pdfgen import canvas

BASE_URL = "http://localhost:8000/api"

def create_test_pdf():
    c = canvas.Canvas("test_split.pdf")
    c.drawString(100, 750, "Page 1 Content")
    c.showPage()
    c.drawString(100, 750, "Page 2 Content")
    c.showPage()
    c.drawString(100, 750, "Page 3 Content")
    c.save()
    print("Created 3-page PDF")

def test_split():
    print("\nTesting Split PDF with pages='1,2'...")
    with open("test_split.pdf", "rb") as f:
        files = {"file": f}
        data = {"pages": "1,2"}
        response = requests.post(f"{BASE_URL}/split-pdf", files=files, data=data)
    
    if response.status_code == 200:
        print("✅ Split PDF: Success")
        with open("split_output.pdf", "wb") as out:
            out.write(response.content)
        print("Saved to split_output.pdf")
    else:
        print(f"❌ Split PDF: Failed ({response.status_code})")
        print(f"Response: {response.text}")

def cleanup():
    if os.path.exists("test_split.pdf"): os.remove("test_split.pdf")
    if os.path.exists("split_output.pdf"): os.remove("split_output.pdf")

if __name__ == "__main__":
    try:
        create_test_pdf()
        test_split()
    except Exception as e:
        import traceback
        traceback.print_exc()
    finally:
        cleanup()
