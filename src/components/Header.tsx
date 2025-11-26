import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Calendar, FileText, Home, Menu, Scale, Users, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <div className="ml-4 flex items-center gap-3">
          <img
            src="/logo-gj.png"
            alt="Logo Gestor Judicial"
            className="h-10 w-auto object-contain"
          />
          <h1 className="text-xl font-semibold">
            <Link to="/">Agendamiento Gestor Judicial</Link>
          </h1>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navegación</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Inicio</span>
          </Link>

          <Link
            to="/juicios"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <Scale size={20} />
            <span className="font-medium">Juicios</span>
          </Link>

          <Link
            to="/participantes"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <Users size={20} />
            <span className="font-medium">Participantes</span>
          </Link>

          <Link
            to="/agendamiento"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <Calendar size={20} />
            <span className="font-medium">Agendar Juicio</span>
          </Link>

          <Link
            to="/auditoria"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <FileText size={20} />
            <span className="font-medium">Auditoría</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
