import React, { useEffect } from 'react'
import { Button } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useJuicio } from '../hooks/useJuicios'
import { juiciosKeys } from '../../../queries/juicios.queries'
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
  juicio: initialJuicio,
}) => {
  const queryClient = useQueryClient()
  const {
    data: juicio,
    refetch,
    error,
    isError,
  } = useJuicio(initialJuicio?.id || '')

  // Cerrar modal si el juicio fue eliminado (404) y detener polling
  useEffect(() => {
    if (isError) {
      const httpError = error as {
        statusCode?: number
        response?: { status?: number }
      }
      const statusCode = httpError.statusCode || httpError.response?.status

      if (statusCode === 404) {
        // El juicio fue eliminado, cerrar el modal inmediatamente
        onOpenChange(false)
        // Eliminar la query del caché para evitar más intentos
        queryClient.removeQueries({
          queryKey: juiciosKeys.detail(initialJuicio?.id || ''),
        })
      }
    }
  }, [isError, error, onOpenChange, initialJuicio?.id, queryClient])

  // Polling automático cuando el modal está abierto (solo si no hay error)
  useEffect(() => {
    if (!isOpen || !initialJuicio?.id || isError) return

    const intervalId = setInterval(() => {
      // Invalidar y refetch la query del juicio para obtener los estados actualizados
      queryClient.invalidateQueries({
        queryKey: juiciosKeys.detail(initialJuicio.id),
      })
      refetch().catch((err) => {
        // Si hay error en el refetch (especialmente 404), detener el polling
        const httpError = err as { statusCode?: number }
        if (httpError.statusCode === 404) {
          clearInterval(intervalId)
        }
      })
    }, 5000) // Refetch cada 5 segundos

    return () => clearInterval(intervalId)
  }, [isOpen, initialJuicio?.id, queryClient, refetch, isError])

  // Usar el juicio actualizado si está disponible, sino el inicial
  const juicioToDisplay = juicio || initialJuicio

  // Si hay error 404, no mostrar nada (el modal se cerrará automáticamente)
  if (isError) {
    const httpError = error as { statusCode?: number }
    if (httpError.statusCode === 404) {
      return null
    }
  }

  if (!juicioToDisplay) return null

  const fecha = new Date(juicioToDisplay.fecha).toLocaleDateString('es-EC', {
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
              juicioToDisplay.estado,
            )}`}
          >
            {juicioToDisplay.estado}
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
              {juicioToDisplay.numeroCaso}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Tipo de Juicio
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicioToDisplay.tipoJuicio}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Fecha</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">{fecha}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Hora</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicioToDisplay.hora}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Sala</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicioToDisplay.sala}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Estado</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {juicioToDisplay.estado}
            </p>
          </div>
        </div>

        {/* Descripción */}
        {juicioToDisplay.descripcion && (
          <div>
            <label className="text-sm font-medium text-gray-500">
              Descripción
            </label>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">
              {juicioToDisplay.descripcion}
            </p>
          </div>
        )}

        {/* Participantes */}
        <div>
          <label className="text-sm font-medium text-gray-500 mb-3 block">
            Participantes ({juicioToDisplay.participantes?.length || 0})
          </label>
          {!juicioToDisplay.participantes ||
          juicioToDisplay.participantes.length === 0 ? (
            <p className="text-gray-500 italic">
              No hay participantes asignados
            </p>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {juicioToDisplay.participantes.map((jp) => {
                // Buscar notificación para este participante
                const notificacion = juicioToDisplay.notificaciones?.find(
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
                        Leído:{' '}
                        {new Date(notificacion.fechaLectura).toLocaleString(
                          'es-EC',
                        )}
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
              {new Date(juicioToDisplay.createdAt).toLocaleString('es-EC')}
            </div>
            <div>
              <span className="font-medium">Actualizado:</span>{' '}
              {new Date(juicioToDisplay.updatedAt).toLocaleString('es-EC')}
            </div>
          </div>
        </div>
      </div>
    </CustomModalNextUI>
  )
}
