import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useDeleteParticipante } from '../mutations/useDeleteParticipante'
import { useParticipantes } from '../hooks/useParticipantes'
import { ParticipanteCard } from './ParticipanteCard'
import { ParticipanteModal } from './ParticipanteModal'
import type { Participante } from '../types'

export function ParticipanteList() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingParticipante, setEditingParticipante] = useState<
    Participante | undefined
  >()
  const debouncedSearch = useDebounce(search, 300)
  const {
    data: participantes,
    isLoading,
    error,
  } = useParticipantes(debouncedSearch)
  const deleteMutation = useDeleteParticipante()

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de eliminar este participante?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          Error al cargar los participantes. Por favor, intente nuevamente.
        </p>
      </div>
    )
  }

  if (!participantes || participantes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No hay participantes registrados
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Crea un nuevo participante para comenzar
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <input
          type="text"
          placeholder="Buscar por nombre, email o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {participantes.map((participante) => (
          <ParticipanteCard
            key={participante.id}
            participante={participante}
            onEdit={() => {
              setEditingParticipante(participante)
              setIsModalOpen(true)
            }}
            onDelete={() => handleDelete(participante.id)}
          />
        ))}
      </div>

      <ParticipanteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingParticipante(undefined)
        }}
        participante={editingParticipante}
      />
    </div>
  )
}
