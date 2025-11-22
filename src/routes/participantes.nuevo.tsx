import { createFileRoute } from '@tanstack/react-router';
import { ParticipanteForm } from '../app/features/participantes/components/ParticipanteForm';

export const Route = createFileRoute('/participantes/nuevo')({
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Participante</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ParticipanteForm />
      </div>
    </div>
  ),
});

