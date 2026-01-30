import pdfplumber

def leer_txt(file):
    contenido = file.file.read().decode("utf-8")
    return contenido

def leer_pdf(file):
    texto = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            texto += page.extract_text() + "\n"
    return texto
