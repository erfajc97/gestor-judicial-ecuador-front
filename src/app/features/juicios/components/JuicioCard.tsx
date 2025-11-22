import { Link } from '@tanstack/react-router'
import type { Juicio } from '../types'

interface JuicioCardProps {
  juicio: Juicio
}

export function JuicioCard({ juicio }: JuicioCardProps) {
  const fecha = new Date(juicio.fecha).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const participantesCount = juicio.participantes?.length || 0

  return (
    <Link
      to="/juicios/$id"
      params={{ id: juicio.id }}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {juicio.numeroCaso}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{juicio.tipoJuicio}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            juicio.estado === 'PROGRAMADO'
              ? 'bg-blue-100 text-blue-800'
              : juicio.estado === 'EN_CURSO'
                ? 'bg-yellow-100 text-yellow-800'
                : juicio.estado === 'COMPLETADO'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
          }`}
        >
          {juicio.estado}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-medium">Fecha:</span>
          <span>{fecha}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Hora:</span>
          <span>{juicio.hora}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Sala:</span>
          <span>{juicio.sala}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Participantes:</span>
          <span>{participantesCount}</span>
        </div>
      </div>

      {juicio.descripcion && (
        <p className="mt-4 text-sm text-gray-500 line-clamp-2">
          {juicio.descripcion}
        </p>
      )}
    </Link>
  )
}
