import { createFileRoute } from '@tanstack/react-router'
import { ParticipanteForm } from '../app/features/participantes/components/ParticipanteForm'
import { useParticipante } from '../app/features/participantes/hooks/useParticipantes'

export const Route = createFileRoute('/participantes/$id/editar')({
  component: () => {
    const { id } = Route.useParams()
    const { data: participante, isLoading } = useParticipante(id)

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    if (!participante) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Participante no encontrado</p>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Editar Participante
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ParticipanteForm participante={participante} />
        </div>
      </div>
    )
  },
})
