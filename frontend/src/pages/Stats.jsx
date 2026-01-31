import { useEffect, useState } from "react"

function Stats() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/estadisticas")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar estadísticas")
        return res.json()
      })
      .then(data => {
        setStats(data)
      })
      .catch(err => {
        console.error(err)
        setError("No se pudieron cargar las estadísticas")
      })
  }, [])

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!stats) {
    return <p className="text-gray-500">Cargando estadísticas...</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Estadísticas del sistema</h2>

      {/* TOTAL */}
      <div className="p-4 border rounded">
        <p>
          Total de análisis realizados:{" "}
          <strong>{stats.total_analisis}</strong>
        </p>
      </div>

      {/* TIEMPOS */}
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-2">Tiempo promedio de ejecución (ns)</h3>
        <p>
          KMP:{" "}
          <strong>{stats.tiempos_promedio_ns.kmp}</strong>
        </p>
        <p>
          Boyer–Moore:{" "}
          <strong>{stats.tiempos_promedio_ns.boyer_moore}</strong>
        </p>
      </div>

      {/* CATEGORÍAS */}
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-2">Reclamos por categoría</h3>

        {Object.keys(stats.conteo_categorias).length === 0 ? (
          <p className="text-gray-500">No hay reclamos detectados</p>
        ) : (
          <ul className="list-disc ml-6">
            {Object.entries(stats.conteo_categorias).map(
              ([categoria, cantidad]) => (
                <li key={categoria}>
                  {categoria}: <strong>{cantidad}</strong>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Stats
