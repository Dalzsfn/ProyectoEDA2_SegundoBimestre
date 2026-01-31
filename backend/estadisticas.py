from collections import defaultdict
from typing import Dict, List


# ===============================
# 📊 ESTADO GLOBAL DE ESTADÍSTICAS
# ===============================
_estadisticas = {
    "total_analisis": 0,
    "tiempo_kmp_ns": [],
    "tiempo_bm_ns": [],
    "categorias": defaultdict(int)
}


# ===============================
# ➕ REGISTRAR UNA EJECUCIÓN
# ===============================
def registrar_resultados(resultados: List[Dict]):
    """
    Se llama UNA VEZ cada vez que se analiza un texto.
    Recibe la lista de resultados devuelta por analizar_mensaje().
    """

    _estadisticas["total_analisis"] += 1

    for r in resultados:
        res = r["resultado"]

        _estadisticas["tiempo_kmp_ns"].append(res["tiempo_kmp_ns"])
        _estadisticas["tiempo_bm_ns"].append(res["tiempo_bm_ns"])

        categoria = r["categoria"]
        _estadisticas["categorias"][categoria] += 1


# ===============================
# 📈 OBTENER ESTADÍSTICAS
# ===============================
def obtener_estadisticas():
    """
    Devuelve las estadísticas listas para el frontend.
    """

    def promedio(valores):
        return sum(valores) // len(valores) if valores else 0

    return {
        "total_analisis": _estadisticas["total_analisis"],

        "tiempos_promedio_ns": {
            "kmp": promedio(_estadisticas["tiempo_kmp_ns"]),
            "boyer_moore": promedio(_estadisticas["tiempo_bm_ns"])
        },

        "conteo_categorias": dict(_estadisticas["categorias"])
    }


# ===============================
# 🔄 RESET (OPCIONAL)
# ===============================
def reset_estadisticas():
    """
    Limpia todas las estadísticas (útil para pruebas).
    """
    _estadisticas["total_analisis"] = 0
    _estadisticas["tiempo_kmp_ns"].clear()
    _estadisticas["tiempo_bm_ns"].clear()
    _estadisticas["categorias"].clear()
