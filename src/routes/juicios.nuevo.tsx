import { createFileRoute } from '@tanstack/react-router';
import { JuicioForm } from '../app/features/juicios/components/JuicioForm';

export const Route = createFileRoute('/juicios/nuevo')({
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Juicio</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <JuicioForm />
      </div>
    </div>
  ),
});

