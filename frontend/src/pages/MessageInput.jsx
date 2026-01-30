import { useState } from "react"

function MessageInput() {
  const [mensaje, setMensaje] = useState("")
  const [archivo, setArchivo] = useState(null)
  const [resultados, setResultados] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const analizar = async () => {
    setCargando(true)
    setError(null)
    setResultados(null)

    try {
      const formData = new FormData()
      formData.append("mensaje", mensaje)

      if (archivo) {
        formData.append("archivo", archivo)
      }

      const res = await fetch("http://127.0.0.1:8000/analizar", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResultados(data.resultados)
      }

    } catch (err) {
      setError("No se pudo conectar con el servidor")
    }

    setCargando(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* 📝 TEXTO */}
      <div>
        <label className="block font-semibold mb-2">
          Mensaje del cliente
        </label>
        <textarea
          className="w-full border rounded p-3 min-h-[120px]"
          placeholder="Ingrese el mensaje del cliente..."
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
        />
      </div>

      {/* 📎 ARCHIVO */}
      <div>
        <label className="block font-semibold mb-2">
          Subir archivo (PDF o TXT)
        </label>
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={e => setArchivo(e.target.files[0])}
        />
        {archivo && (
          <p className="text-sm text-gray-500 mt-1">
            Archivo seleccionado: {archivo.name}
          </p>
        )}
      </div>

      {/* ▶️ BOTÓN */}
      <button
        onClick={analizar}
        disabled={cargando}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {cargando ? "Analizando..." : "Analizar"}
      </button>

      {/* ❌ ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {/* 📊 RESULTADOS */}
      {resultados && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold">Resultados</h3>

          {resultados.length === 0 && (
            <p className="text-green-600">
              ✅ No se detectaron reclamos
            </p>
          )}

          {resultados.map((r, i) => (
            <div
              key={i}
              className="border rounded p-4 bg-gray-50"
            >
              <p><b>Patrón:</b> {r.patron}</p>
              <p><b>Categoría:</b> {r.categoria}</p>
              <p><b>Nivel de alerta:</b> {r.alerta}</p>
              <p><b>Sugerencia:</b> {r.sugerencia}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default MessageInput
