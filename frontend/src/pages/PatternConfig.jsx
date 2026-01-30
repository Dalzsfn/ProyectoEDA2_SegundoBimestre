import { useState } from "react"

function PatternConfig() {
  const [patron, setPatron] = useState("")
  const [categoria, setCategoria] = useState("Reclamo")
  const [nivel, setNivel] = useState("Bajo")
  const [sugerencia, setSugerencia] = useState("")
  const [mensaje, setMensaje] = useState("")

  const guardarPatron = async () => {
    if (!patron || !sugerencia) {
      setMensaje("❌ Complete todos los campos")
      return
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/patrones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patron,
          categoria,
          nivel_alerta: nivel,
          sugerencia,
        }),
      })

      if (!res.ok) throw new Error("Error al guardar")

      setMensaje("✅ Patrón guardado correctamente")

      // limpiar formulario
      setPatron("")
      setCategoria("Reclamo")
      setNivel("Bajo")
      setSugerencia("")
    } catch (error) {
      setMensaje("❌ Error al conectar con el servidor")
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Configuración de Patrones</h2>

      {mensaje && <p className="text-sm">{mensaje}</p>}

      {/* Patrón */}
      <input
        className="border p-2 w-full"
        placeholder="Texto del patrón (ej: voy a demandar)"
        value={patron}
        onChange={(e) => setPatron(e.target.value)}
      />

      {/* Categoría */}
      <select
        className="border p-2 w-full"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option>Reclamo crítico</option>
        <option>Riesgo legal</option>
        <option>Reclamo</option>
        <option>Queja leve</option>
      </select>

      {/* Nivel de alerta */}
      <select
        className="border p-2 w-full"
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
      >
        <option>Bajo</option>
        <option>Medio</option>
        <option>Alto</option>
        <option>Crítico</option>
      </select>

      {/* Sugerencia */}
      <textarea
        className="border p-2 w-full"
        placeholder="Sugerencia de acción para este patrón"
        value={sugerencia}
        onChange={(e) => setSugerencia(e.target.value)}
      />

      <button
        onClick={guardarPatron}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Guardar patrón
      </button>
    </div>
  )
}

export default PatternConfig
