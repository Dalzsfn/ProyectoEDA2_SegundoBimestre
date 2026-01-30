from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from sistema import cargar_patrones, analizar_mensaje
from utils_archivos import leer_txt, leer_pdf

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- CARGA DE PATRONES (UNA SOLA VEZ) --------
patrones = cargar_patrones("data/patrones.csv")

# -------- ENDPOINTS --------

@app.get("/")
def root():
    return {"status": "API WISEcheck activa"}

@app.post("/analizar")
async def analizar(
    mensaje: str = Form(""),
    archivo: UploadFile = File(None)
):
    texto_total = mensaje

    # 📄 Si viene archivo
    if archivo:
        if archivo.filename.endswith(".txt"):
            texto_archivo = leer_txt(archivo)

        elif archivo.filename.endswith(".pdf"):
            texto_archivo = leer_pdf(archivo)

        else:
            return {
                "error": "Formato no soportado. Use PDF o TXT."
            }

        texto_total += "\n" + texto_archivo

    # 🧠 Analizar texto completo
    resultados = analizar_mensaje(texto_total, patrones)

    return {
        "texto_analizado": texto_total,
        "resultados": resultados
    }
