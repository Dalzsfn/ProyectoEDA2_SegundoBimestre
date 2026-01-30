import { useState } from "react"

function PatternConfig() {
  const [pattern, setPattern] = useState("")
  const [level, setLevel] = useState("Bajo")
  const [patterns, setPatterns] = useState([])

  function addPattern() {
    setPatterns([...patterns, { pattern, level }])
    setPattern("")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Configuración de patrones</h2>

      <input
        className="border p-2 w-full"
        placeholder="Patrón"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option>Bajo</option>
        <option>Medio</option>
        <option>Alto</option>
      </select>

      <button onClick={addPattern} className="bg-green-600 text-white px-4 py-2 rounded">
        Agregar patrón
      </button>

      <ul className="mt-4 space-y-2">
        {patterns.map((p, i) => (
          <li key={i} className="border p-2 rounded">
            {p.pattern} — <strong>{p.level}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PatternConfig
