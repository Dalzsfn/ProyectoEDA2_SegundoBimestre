import csv
import io
from PyPDF2 import PdfReader
import pandas as pd
from fastapi import UploadFile

from algoritmos.normalizacion import normalizar_texto


# =====================
# 📄 TXT → TEXTO
# =====================
def leer_txt(archivo: UploadFile) -> str:
    contenido = archivo.file.read().decode("utf-8", errors="ignore")
    return normalizar_texto(contenido)


# =====================
# 📄 PDF → TEXTO
# =====================
def leer_pdf(archivo: UploadFile) -> str:
    reader = PdfReader(archivo.file)
    texto = ""

    for pagina in reader.pages:
        extraido = pagina.extract_text()
        if extraido:
            texto += extraido + " "

    return normalizar_texto(texto)


# =====================
# 📊 CSV → TEXTO
# =====================
def leer_csv_como_texto(archivo: UploadFile) -> str:
    contenido = archivo.file.read().decode("utf-8", errors="ignore")
    lector = csv.reader(io.StringIO(contenido))

    texto = ""
    for fila in lector:
        texto += " ".join(fila) + " "

    return normalizar_texto(texto)


# =====================
# 📊 EXCEL → TEXTO
# =====================
def leer_excel_como_texto(archivo: UploadFile) -> str:
    df = pd.read_excel(archivo.file)

    texto = ""
    for _, fila in df.iterrows():
        texto += " ".join(map(str, fila.values)) + " "

    return normalizar_texto(texto)
