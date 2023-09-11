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

builder.queryType({
  fields: t => ({
    hello: t.string({
      resolve: () => "world"
    }),
    users: t.field({
      type: [User],
      resolve: async () => prisma.user.findMany({})
    }),
    me: t.field({
      type: User,
      resolve: async () => prisma.user.findUniqueOrThrow()
    })
  })
})

export const schema = builder.toSchema()
