import { useEffect, useState } from 'react'
import { useCreateParticipante } from '../mutations/useCreateParticipante'
import { useUpdateParticipante } from '../mutations/useUpdateParticipante'
import { TipoParticipante } from '../types'
import type { CreateParticipanteDto, Participante } from '../types'

interface ParticipanteModalProps {
  isOpen: boolean
  onClose: () => void
  participante?: Participante
}

export function ParticipanteModal({
  isOpen,
  onClose,
  participante,
}: ParticipanteModalProps) {
  const createMutation = useCreateParticipante()
  const updateMutation = useUpdateParticipante()

  const [formData, setFormData] = useState<CreateParticipanteDto>({
    nombre: '',
    email: '',
    telefono: '',
    tipo: TipoParticipante.JUEZ,
    telegramChatId: '',
  })

  // Reset form when modal opens/closes or participante changes
  useEffect(() => {
    if (isOpen) {
      if (participante) {
        setFormData({
          nombre: participante.nombre || '',
          email: participante.email || '',
          telefono: participante.telefono || '',
          tipo: participante.tipo,
          telegramChatId: participante.telegramChatId || '',
        })
      } else {
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          tipo: TipoParticipante.JUEZ,
          telegramChatId: '',
        })
      }
    }
  }, [isOpen, participante])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (participante) {
        await updateMutation.mutateAsync({
          id: participante.id,
          data: formData,
        })
      } else {
        await createMutation.mutateAsync(formData)
      }

      onClose()
    } catch (error) {
      console.error('Error al guardar participante:', error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {participante ? 'Editar Participante' : 'Nuevo Participante'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="tipo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tipo *
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={TipoParticipante.JUEZ}>Juez</option>
                  <option value={TipoParticipante.ABOGADO_DEMANDANTE}>
                    Abogado Demandante
                  </option>
                  <option value={TipoParticipante.ABOGADO_DEFENSOR}>
                    Abogado Defensor
                  </option>
                  <option value={TipoParticipante.ACUSADO}>Acusado</option>
                  <option value={TipoParticipante.PERITO}>Perito</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="telegramChatId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Telegram Chat ID
                </label>
                <input
                  type="text"
                  id="telegramChatId"
                  name="telegramChatId"
                  value={formData.telegramChatId}
                  onChange={handleChange}
                  placeholder="Ingrese el Chat ID de Telegram"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  El Chat ID se obtiene cuando el usuario inicia conversación
                  con el bot de Telegram
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading
                  ? 'Guardando...'
                  : participante
                    ? 'Actualizar'
                    : 'Crear Participante'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
