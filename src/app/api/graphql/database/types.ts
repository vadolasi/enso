import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Cargo = {
    ADMINISTRADOR_MESTRE: "ADMINISTRADOR_MESTRE",
    ADMINISTRADOR: "ADMINISTRADOR",
    MODERADOR: "MODERADOR",
    USUARIO: "USUARIO"
} as const;
export type Cargo = (typeof Cargo)[keyof typeof Cargo];
export const TipoTicket = {
    DUVIDA: "DUVIDA",
    ERRO: "ERRO",
    SUGESTAO: "SUGESTAO"
} as const;
export type TipoTicket = (typeof TipoTicket)[keyof typeof TipoTicket];
export const TipoQuestao = {
    OBJETIVA: "OBJETIVA",
    DISCURSIVA: "DISCURSIVA"
} as const;
export type TipoQuestao = (typeof TipoQuestao)[keyof typeof TipoQuestao];
export const TipoVoto = {
    POSITIVO: "POSITIVO",
    NEGATIVO: "NEGATIVO"
} as const;
export type TipoVoto = (typeof TipoVoto)[keyof typeof TipoVoto];
export type Account = {
    id: string;
    providerType: string;
    providerId: string;
    providerAccountId: string;
    refreshToken: string | null;
    accessToken: string | null;
    accessTokenExpires: Timestamp | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    userId: number;
};
export type Alternativa = {
    id: Generated<number>;
    enunciado: string;
    enunciadoDelta: string;
    correta: Generated<boolean>;
    questaoId: number;
};
export type Area = {
    id: Generated<number>;
    nome: string;
};
export type Area_CasoClinico = {
    id: Generated<number>;
    areaId: number;
    casoClinicoId: number;
};
export type CadernoQuestoes = {
    id: Generated<number>;
    usuarioId: number;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
};
export type CasoClinico = {
    id: Generated<number>;
    enunciado: string;
    enunciadoDelta: string;
};
export type CasoClinico_SubArea = {
    id: Generated<number>;
    casoClinicoId: number;
    subAreaId: number;
};
export type Denucia = {
    id: Generated<number>;
    usuarioId: number;
    usuarioDenuciadoId: number;
    postagemId: number | null;
    comentario: string;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
};
export type PostagemForum = {
    id: Generated<number>;
    usuarioId: number;
    questaoId: number | null;
    comentario: string;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
    respostaParaId: number | null;
};
export type Questao = {
    id: Generated<number>;
    enunciado: string;
    enunciadoDelta: string;
    casoClinicoId: number;
    tipo: TipoQuestao;
};
export type Questao_CadernoQuestoes = {
    id: Generated<number>;
    questaoId: number;
    cadernoQuestoesId: number;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
};
export type Questao_Simulado = {
    id: Generated<number>;
    questaoId: number;
    simuladoId: number;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
};
export type Recorrecao = {
    id: Generated<number>;
    ticketId: number;
    questaoId: number | null;
    comentario: string;
    dataCriacao: Generated<Timestamp>;
};
export type Resposta = {
    id: Generated<number>;
    usuarioId: number;
    questaoId: number | null;
    alternativaId: number;
    correto: Generated<boolean>;
    dataCriacao: Generated<Timestamp>;
    tipo: TipoQuestao;
    resposta: string | null;
};
export type Session = {
    id: string;
    expires: Timestamp;
    sessionToken: string;
    accessToken: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    userId: number;
};
export type Simulado = {
    id: Generated<number>;
    usuarioId: number;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
};
export type SubArea = {
    id: Generated<number>;
    nome: string;
    areaId: number;
};
export type Ticket = {
    id: Generated<number>;
    usuarioId: number;
    questaoId: number | null;
    comentario: string;
    dataCriacao: Generated<Timestamp>;
};
export type User = {
    id: Generated<number>;
    imagem: string | null;
    nome: string;
    email: string;
    emailConfirmado: Generated<boolean>;
    senha: string | null;
    assasId: string | null;
    cargo: Generated<Cargo>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type VerificationRequest = {
    id: string;
    identifier: string;
    token: string;
    expires: Timestamp;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type VotoPostagem = {
    id: Generated<number>;
    usuarioId: number;
    postagemId: number;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
    tipo: TipoVoto;
};
export type DB = {
    Account: Account;
    Alternativa: Alternativa;
    Area: Area;
    Area_CasoClinico: Area_CasoClinico;
    CadernoQuestoes: CadernoQuestoes;
    CasoClinico: CasoClinico;
    CasoClinico_SubArea: CasoClinico_SubArea;
    Denucia: Denucia;
    PostagemForum: PostagemForum;
    Questao: Questao;
    Questao_CadernoQuestoes: Questao_CadernoQuestoes;
    Questao_Simulado: Questao_Simulado;
    Recorrecao: Recorrecao;
    Resposta: Resposta;
    Session: Session;
    Simulado: Simulado;
    SubArea: SubArea;
    Ticket: Ticket;
    User: User;
    VerificationRequest: VerificationRequest;
    VotoPostagem: VotoPostagem;
};
