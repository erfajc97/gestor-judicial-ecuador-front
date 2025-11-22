const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const endpoints = {
  juicios: {
    list: `${API_BASE_URL}/juicios`,
    create: `${API_BASE_URL}/juicios`,
    getById: (id: string) => `${API_BASE_URL}/juicios/${id}`,
    update: (id: string) => `${API_BASE_URL}/juicios/${id}`,
    delete: (id: string) => `${API_BASE_URL}/juicios/${id}`,
    addParticipante: (id: string) =>
      `${API_BASE_URL}/juicios/${id}/participantes`,
    removeParticipante: (id: string, participanteId: string) =>
      `${API_BASE_URL}/juicios/${id}/participantes/${participanteId}`,
  },
  participantes: {
    list: `${API_BASE_URL}/participantes`,
    create: `${API_BASE_URL}/participantes`,
    getById: (id: string) => `${API_BASE_URL}/participantes/${id}`,
    update: (id: string) => `${API_BASE_URL}/participantes/${id}`,
    delete: (id: string) => `${API_BASE_URL}/participantes/${id}`,
  },
  telegram: {
    register: `${API_BASE_URL}/telegram/register`,
  },
} as const
