import { useState } from "react"

function MessageInput() {
  const [message, setMessage] = useState("")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Ingreso de mensaje / email</h2>

      <textarea
        className="w-full border rounded p-3"
        rows="6"
        placeholder="Ingrese aquí el mensaje o email..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Analizar mensaje
      </button>
    </div>
  )
}

export default MessageInput
