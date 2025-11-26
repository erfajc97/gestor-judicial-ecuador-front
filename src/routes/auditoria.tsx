import { createFileRoute } from '@tanstack/react-router'
import AuditoriaPage from '../app/features/auditoria/AuditoriaPage'

export const Route = createFileRoute('/auditoria')({
  component: AuditoriaPage,
})

