import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useJuicio } from '@/app/features/juicios/hooks/useJuicios'
import { JuicioForm } from '@/app/features/juicios/components/JuicioForm'
import { useDeleteJuicio } from '@/app/features/juicios/mutations/useDeleteJuicio'

export const Route = createFileRoute('/juicios/$id')({
  component: JuicioDetail,
})

function JuicioDetail() {
  const { id } = Route.useParams()
  const { data: juicio, isLoading } = useJuicio(id)
  const deleteMutation = useDeleteJuicio()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (confirm('¿Está seguro de eliminar este juicio?')) {
      try {
        await deleteMutation.mutateAsync(id)
        navigate({ to: '/juicios' })
      } catch (error) {
        console.error('Error al eliminar juicio:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!juicio) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">Juicio no encontrado</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Juicio</h1>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <JuicioForm juicio={juicio} />
      </div>
    </div>
  )
}
