import { useState } from 'react'
import { useParticipantes } from '../../participantes/hooks/useParticipantes'

interface ParticipantesSelectorProps {
  selected: Array<string>
  onChange: (selected: Array<string>) => void
}

export function ParticipantesSelector({
  selected,
  onChange,
}: ParticipantesSelectorProps) {
  const [search, setSearch] = useState('')
  const { data: participantes, isLoading } = useParticipantes(search)

  const toggleParticipante = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((pid) => pid !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="Buscar participante por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {isLoading ? (
        <div className="text-gray-500 text-center py-4">
          Cargando participantes...
        </div>
      ) : !participantes || participantes.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          {search
            ? 'No se encontraron participantes'
            : 'No hay participantes disponibles. Crea participantes primero.'}
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4">
          {participantes.map((participante) => (
            <label
              key={participante.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(participante.id)}
                onChange={() => toggleParticipante(participante.id)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {participante.nombre}
                </div>
                <div className="text-sm text-gray-500">{participante.tipo}</div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
