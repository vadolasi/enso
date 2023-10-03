import SchemaBuilder from "@pothos/core"
import { Cargo } from "@prisma/client"
import PrismaPlugin from "@pothos/plugin-prisma"
import PrismaUtils from "@pothos/plugin-prisma-utils"
import type PrismaTypes from "@pothos/plugin-prisma/generated"
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects"
import ScopeAuthPlugin from "@pothos/plugin-scope-auth"
import prisma from "@/lib/prisma"

class User {
  id: string
  email: string
  name: string
  cargo: Cargo

  constructor(id: string, email: string, name: string, cargo: Cargo) {
    this.id = id
    this.email = email
    this.name = name
    this.cargo = cargo
  }
}

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes,
  Context: {
    currentUser: User
  },
  AuthScopes: {
    loggedIn: boolean,
    admin: boolean
  }
}>({
  plugins: [PrismaPlugin, PrismaUtils, SimpleObjectsPlugin, ScopeAuthPlugin],
  prisma: {
    client: prisma
  },
  authScopes: async (context) => ({
    loggedIn: !!context.currentUser,
    admin: () =>  context.currentUser?.cargo === Cargo.ADMINISTRADOR
  }),
  scopeAuthOptions: {
    authorizeOnSubscribe: true
  }
})

builder.queryType()
builder.mutationType()

export default builder
