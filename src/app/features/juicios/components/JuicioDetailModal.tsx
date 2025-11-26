import React from 'react'
import { Button } from '@heroui/react'
import { EstadoJuicio, EstadoNotificacion } from '../types'
import type { Juicio } from '../types'
import CustomModalNextUI from '@/components/UI/CustomModalNextUI'

interface JuicioDetailModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  juicio: Juicio | null | undefined
}

export const JuicioDetailModal: React.FC<JuicioDetailModalProps> = ({
  isOpen,
  onOpenChange,
  juicio,
}) => {
  if (!juicio) return null

  const fecha = new Date(juicio.fecha).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const getEstadoColor = (estado: EstadoJuicio) => {
    switch (estado) {
      case EstadoJuicio.PROGRAMADO:
        return 'bg-blue-100 text-blue-800'
      case EstadoJuicio.EN_CURSO:
        return 'bg-yellow-100 text-yellow-800'
      case EstadoJuicio.COMPLETADO:
        return 'bg-green-100 text-green-800'
      case EstadoJuicio.CANCELADO:
        return 'bg-red-100 text-red-800'
      case EstadoJuicio.REAGENDADO:
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <CustomModalNextUI
      size="xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      headerContent={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Detalles del Juicio
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(
              juicio.estado,
            )}`}
          >
            {juicio.estado}
          </span>
        </div>
      }
      footerContent={
        <Button
          onPress={() => onOpenChange(false)}
          radius="lg"
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Cerrar
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Información Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Número de Caso
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicio.numeroCaso}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Tipo de Juicio
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicio.tipoJuicio}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Fecha</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">{fecha}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Hora</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicio.hora}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Sala</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicio.sala}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Estado</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicio.estado}
            </p>
          </div>
        </div>

        {/* Descripción */}
        {juicio.descripcion && (
          <div>
            <label className="text-sm font-medium text-gray-500">
              Descripción
            </label>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">
              {juicio.descripcion}
            </p>
          </div>
        )}

        {/* Participantes */}
        <div>
          <label className="text-sm font-medium text-gray-500 mb-3 block">
            Participantes ({juicio.participantes?.length || 0})
          </label>
          {!juicio.participantes || juicio.participantes.length === 0 ? (
            <p className="text-gray-500 italic">
              No hay participantes asignados
            </p>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {juicio.participantes.map((jp) => {
                // Buscar notificación para este participante
                const notificacion = juicio.notificaciones?.find(
                  (n) => n.participanteId === jp.participante.id,
                )

                const getEstadoBadge = (estado?: EstadoNotificacion) => {
                  if (!estado) {
                    return (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        ⚪ Sin notificar
                      </span>
                    )
                  }
                  switch (estado) {
                    case EstadoNotificacion.ENVIADO:
                      return (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          🟡 Enviado
                        </span>
                      )
                    case EstadoNotificacion.ENTREGADO:
                      return (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          🔵 Entregado
                        </span>
                      )
                    case EstadoNotificacion.LEIDO:
                      return (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          🟢 Leído
                        </span>
                      )
                    default:
                      return null
                  }
                }

                return (
                  <div
                    key={jp.id}
                    className="p-3 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-900">
                            {jp.participante.nombre}
                          </p>
                          {getEstadoBadge(notificacion?.estado)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {jp.participante.tipo}
                        </p>
                        {jp.rol && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mt-1 inline-block">
                            {jp.rol}
                          </span>
                        )}
                      </div>
                    </div>
                    {jp.participante.email && (
                      <p className="text-xs text-gray-500 mt-1">
                        {jp.participante.email}
                      </p>
                    )}
                    {jp.participante.telefono && (
                      <p className="text-xs text-gray-500">
                        {jp.participante.telefono}
                      </p>
                    )}
                    {notificacion?.fechaLectura && (
                      <p className="text-xs text-gray-400 mt-1">
                        Leído: {new Date(notificacion.fechaLectura).toLocaleString('es-EC')}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Fechas de creación y actualización */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <span className="font-medium">Creado:</span>{' '}
              {new Date(juicio.createdAt).toLocaleString('es-EC')}
            </div>
            <div>
              <span className="font-medium">Actualizado:</span>{' '}
              {new Date(juicio.updatedAt).toLocaleString('es-EC')}
            </div>
          </div>
        </div>
      </div>
    </CustomModalNextUI>
  )
}
