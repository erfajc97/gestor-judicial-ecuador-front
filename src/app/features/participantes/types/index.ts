export enum TipoParticipante {
  JUEZ = 'JUEZ',
  ABOGADO_DEMANDANTE = 'ABOGADO_DEMANDANTE',
  ABOGADO_DEFENSOR = 'ABOGADO_DEFENSOR',
  ACUSADO = 'ACUSADO',
  PERITO = 'PERITO',
}

export interface Participante {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  tipo: TipoParticipante;
  telegramChatId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParticipanteDto {
  nombre: string;
  email?: string;
  telefono?: string;
  tipo: TipoParticipante;
  telegramChatId?: string;
}

export interface UpdateParticipanteDto extends Partial<CreateParticipanteDto> {}

