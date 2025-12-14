import { createFileRoute } from '@tanstack/react-router'
import DocumentationPage from '../app/features/documentation/DocumentationPage'

export const Route = createFileRoute('/documentation')({
  component: DocumentationPage,
})
