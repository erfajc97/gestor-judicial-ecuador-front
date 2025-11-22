import { BackButton } from '../../../components/BackButton'
import { AgendamientoForm } from './components/AgendamientoForm'

export function AgendamientoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agendar Juicio</h1>
        <p className="text-gray-600 mt-2">
          Complete el formulario para agendar un nuevo juicio y seleccione los
          participantes
        </p>
      </div>

      <div className="bg-white  shadow-md p-6">
        <AgendamientoForm />
      </div>
    </div>
  )
}
