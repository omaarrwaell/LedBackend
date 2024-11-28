from PyPDF2 import PdfReader, PdfWriter

def merge_pdfs():
    writer = PdfWriter()

    # Add the generated PDF
    generated_pdf = PdfReader("./pdfs/quotation.pdf")
    writer.append(generated_pdf)

    # Add pages 6 and 7 from the source PDF
    source_pdf = PdfReader("./pdfs/Outdoor Q8-5S-H-3535.pdf")
    writer.add_page(source_pdf.pages[5])  # Page 6 (0-based index)
    writer.add_page(source_pdf.pages[6])  # Page 7 (0-based index)

    # Write the merged PDF to a new file
    with open("./pdfs/final_quotation.pdf", "wb") as output_file:
        writer.write(output_file)

if __name__ == "__main__":
    merge_pdfs()