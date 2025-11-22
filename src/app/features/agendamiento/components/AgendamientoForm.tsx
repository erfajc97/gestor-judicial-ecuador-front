import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { EstadoJuicio } from '../../juicios/types'
import { useAgendamiento } from '../hooks/useAgendamiento'
import { ParticipantesSelector } from './ParticipantesSelector'
import type { AgendamientoData } from '../types'

export function AgendamientoForm() {
  const navigate = useNavigate()
  const { agendar, isLoading } = useAgendamiento()

  const [formData, setFormData] = useState<
    Omit<AgendamientoData, 'participantes'>
  >({
    numeroCaso: '',
    tipoJuicio: '',
    fecha: '',
    hora: '',
    sala: '',
    descripcion: '',
    estado: EstadoJuicio.PROGRAMADO,
  })

  const [selectedParticipantes, setSelectedParticipantes] = useState<
    Array<string>
  >([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedParticipantes.length === 0) {
      alert('Por favor, seleccione al menos un participante')
      return
    }

    try {
      const data: AgendamientoData = {
        ...formData,
        participantes: selectedParticipantes.map((id) => ({
          participanteId: id,
        })),
      }

      await agendar(data)
      navigate({ to: '/juicios' })
    } catch (error) {
      console.error('Error al agendar juicio:', error)
      alert('Error al agendar el juicio. Por favor, intente nuevamente.')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="numeroCaso"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Número de Caso *
          </label>
          <input
            type="text"
            id="numeroCaso"
            name="numeroCaso"
            value={formData.numeroCaso}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="tipoJuicio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tipo de Juicio *
          </label>
          <input
            type="text"
            id="tipoJuicio"
            name="tipoJuicio"
            value={formData.tipoJuicio}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fecha *
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="hora"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Hora *
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="sala"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sala *
          </label>
          <input
            type="text"
            id="sala"
            name="sala"
            value={formData.sala}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={EstadoJuicio.PROGRAMADO}>Programado</option>
            <option value={EstadoJuicio.EN_CURSO}>En Curso</option>
            <option value={EstadoJuicio.COMPLETADO}>Completado</option>
            <option value={EstadoJuicio.CANCELADO}>Cancelado</option>
            <option value={EstadoJuicio.REAGENDADO}>Reagendado</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="descripcion"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Participantes *
        </label>
        <ParticipantesSelector
          selected={selectedParticipantes}
          onChange={setSelectedParticipantes}
        />
        {selectedParticipantes.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {selectedParticipantes.length} participante(s) seleccionado(s)
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading || selectedParticipantes.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Agendando...' : 'Agendar Juicio'}
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: '/' })}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
