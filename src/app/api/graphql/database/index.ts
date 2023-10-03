import { DB as Database } from "./types"
import SQLite from "better-sqlite3"
import { Kysely, SqliteDialect } from "kysely"

const dialect = new SqliteDialect({
  database: new SQLite("../../../../prisma/dev.db")
})

export const db = new Kysely<Database>({ dialect })
