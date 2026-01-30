from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import csv
import os

from sistema import cargar_patrones, analizar_mensaje
from utils_archivos import leer_txt, leer_pdf

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- MODELOS --------

class PatronEntrada(BaseModel):
    patron: str
    categoria: str
    nivel_alerta: str
    sugerencia: str

# -------- ENDPOINTS --------

@app.get("/")
def root():
    return {"status": "API WISEcheck activa"}

# 📩 ANALIZAR MENSAJE / ARCHIVO
@app.post("/analizar")
async def analizar(
    mensaje: str = Form(""),
    archivo: UploadFile = File(None)
):
    texto_total = mensaje

    if archivo:
        if archivo.filename.endswith(".txt"):
            texto_archivo = leer_txt(archivo)
        elif archivo.filename.endswith(".pdf"):
            texto_archivo = leer_pdf(archivo)
        else:
            return {"error": "Formato no soportado. Use PDF o TXT."}

        texto_total += "\n" + texto_archivo

    # 🔄 cargar patrones ACTUALIZADOS
    patrones_actuales = cargar_patrones("data/patrones.csv")
    resultados = analizar_mensaje(texto_total, patrones_actuales)

    return {
        "texto_analizado": texto_total,
        "resultados": resultados
    }

# ➕ AGREGAR NUEVO PATRÓN
@app.post("/patrones")
def agregar_patron(p: PatronEntrada):
    ruta = os.path.join("data", "patrones.csv")

    with open(ruta, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            p.patron,
            p.categoria,
            p.nivel_alerta,
            p.sugerencia
        ])

    return {"status": "Patrón agregado correctamente"}
