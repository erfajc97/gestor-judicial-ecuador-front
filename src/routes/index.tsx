import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Agendamiento Judicial
        </h1>
        <p className="text-xl text-gray-600">
          Gestión eficiente de juicios y notificaciones
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link
          to="/juicios"
          className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Juicios</h2>
          <p className="text-gray-600">
            Ver y gestionar todos los juicios programados
          </p>
        </Link>

        <Link
          to="/participantes"
          className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Participantes
          </h2>
          <p className="text-gray-600">
            Administrar jueces, abogados, peritos y otros participantes
          </p>
        </Link>

        <Link
          to="/agendamiento"
          className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">➕</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Agendar</h2>
          <p className="text-gray-600">Crear un nuevo agendamiento de juicio</p>
        </Link>
      </div>
    </div>
  )
}
