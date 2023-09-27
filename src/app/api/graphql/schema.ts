import SchemaBuilder from "@pothos/core"
import { PrismaClient } from "@prisma/client"
import PrismaPlugin from "@pothos/plugin-prisma"
import type PrismaTypes from "@pothos/plugin-prisma/generated"

const prisma = new PrismaClient()

const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma
  }
})

const User = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email")
  })
})

const Question = builder.prismaObject("Question", {
  fields: (t) => ({
    id: t.exposeID("id"),
    enunciado: t.exposeString("enunciado")
  })
})

builder.queryType({
  fields: t => ({
    users: t.field({
      type: [User],
      resolve: async () => prisma.user.findMany()
    }),
    me: t.field({
      type: User,
      resolve: async () => prisma.user.findUniqueOrThrow()
    }),
    questions: t.field({
      type: [Question],
      resolve: async () => prisma.question.findMany()
    })
  })
})

const schema = builder.toSchema()

export default schema
