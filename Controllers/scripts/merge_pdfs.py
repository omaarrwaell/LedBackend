import sys
from PyPDF2 import PdfReader, PdfWriter


def merge_pdfs(source_pdf_path):
    try:
        writer = PdfWriter()
        print(source_pdf_path)

        generated_pdf = PdfReader("./pdfs/quotation.pdf")
        writer.append(generated_pdf)

        source_pdf = PdfReader(source_pdf_path)
        writer.add_page(source_pdf.pages[5])
        writer.add_page(source_pdf.pages[6])

        with open("./pdfs/final_quotation.pdf", "wb") as output_file:
            writer.write(output_file)

        print("PDF merge completed successfully.")
    except PdfReader as e:
        print(f"PDF read error: {e}")
        sys.exit(1)
    except FileNotFoundError as e:
        print(f"File not found: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)


if __name__ == "__main__":

    if len(sys.argv) < 2:
        print("Usage: python merge_pdfs.py <source_pdf_path>")
        sys.exit(1)

    source_pdf_path = sys.argv[1]
    merge_pdfs(source_pdf_path)
