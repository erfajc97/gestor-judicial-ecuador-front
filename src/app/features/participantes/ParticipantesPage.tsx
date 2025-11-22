import { useState } from 'react'
import { ParticipanteList } from './components/ParticipanteList'
import { ParticipanteModal } from './components/ParticipanteModal'

export function ParticipantesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Participantes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nuevo Participante
        </button>
      </div>

      <ParticipanteList />

      <ParticipanteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

