function Results() {
  const level = "Alto" // simulado

  const colors = {
    Bajo: "green",
    Medio: "yellow",
    Alto: "red",
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Resultados del análisis</h2>

      <div className={`p-4 rounded bg-${colors[level]}-100`}>
        <p><strong>Nivel de reclamo:</strong> {level}</p>
        <p><strong>Sugerencia:</strong> Atención inmediata</p>
      </div>
    </div>
  )
}

export default Results
