import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Area = {
    id: Generated<number>;
};
export type Question = {
    id: Generated<number>;
    enunciado: string;
};
export type Response = {
    id: Generated<number>;
    userid: number;
    questionId: number;
};
export type User = {
    id: Generated<number>;
    name: string;
    email: string;
    emailConfirmated: Generated<boolean>;
    password: string | null;
    assasId: string | null;
    roleId: Generated<string>;
};
export type UserRole = {
    id: string;
};
export type DB = {
    Area: Area;
    Question: Question;
    Response: Response;
    User: User;
    UserRole: UserRole;
};
