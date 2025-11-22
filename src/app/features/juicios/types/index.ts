export enum EstadoJuicio {
  PROGRAMADO = 'PROGRAMADO',
  EN_CURSO = 'EN_CURSO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
  REAGENDADO = 'REAGENDADO',
}

export interface Participante {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  tipo: string;
  telegramChatId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JuicioParticipante {
  id: string;
  juicioId: string;
  participanteId: string;
  rol?: string;
  createdAt: string;
  participante: Participante;
}

export interface Juicio {
  id: string;
  numeroCaso: string;
  tipoJuicio: string;
  fecha: string;
  hora: string;
  sala: string;
  descripcion?: string;
  estado: EstadoJuicio;
  createdAt: string;
  updatedAt: string;
  participantes?: JuicioParticipante[];
}

export interface CreateJuicioDto {
  numeroCaso: string;
  tipoJuicio: string;
  fecha: string;
  hora: string;
  sala: string;
  descripcion?: string;
  estado?: EstadoJuicio;
  participantes?: Array<{
    participanteId: string;
    rol?: string;
  }>;
}

export interface UpdateJuicioDto extends Partial<CreateJuicioDto> {}

