import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type User = {
    id: Generated<number>;
    name: string;
    email: string;
    emailConfirmated: Generated<number>;
    password: string | null;
    assasId: string | null;
    roleId: Generated<string>;
};
export type UserRole = {
    id: string;
};
export type DB = {
    User: User;
    UserRole: UserRole;
};
