import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Cargo = {
    ADMINISTRADOR: "ADMINISTRADOR",
    USUARIO: "USUARIO"
} as const;
export type Cargo = (typeof Cargo)[keyof typeof Cargo];
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
export type CasoClinico = {
    id: Generated<number>;
    enunciado: string;
};
export type PostagemForum = {
    id: Generated<number>;
    usuarioId: number;
    questaoId: number | null;
    comentario: string;
    dataCriacao: Generated<Timestamp>;
    dataAtualizao: Timestamp;
    replyToId: number | null;
};
export type QuestaoObjetiva = {
    id: Generated<number>;
    enunciado: string;
    casoClinicoId: number;
};
export type RespostaObjetiva = {
    id: Generated<number>;
    usuarioId: number;
    questaoId: number;
    alternativaId: number;
    correto: Generated<boolean>;
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
export type DB = {
    Account: Account;
    Alternativa: Alternativa;
    Area: Area;
    Area_CasoClinico: Area_CasoClinico;
    CasoClinico: CasoClinico;
    PostagemForum: PostagemForum;
    QuestaoObjetiva: QuestaoObjetiva;
    RespostaObjetiva: RespostaObjetiva;
    Session: Session;
    User: User;
    VerificationRequest: VerificationRequest;
};
