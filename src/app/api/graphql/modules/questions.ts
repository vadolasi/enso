import prisma from "@/lib/prisma"
import builder from "../builder"

builder.prismaObject("CasoClinico", {
  findUnique: (questao) => ({ id: questao.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    enunciado: t.exposeString("enunciado"),
    questoesObjetivas: t.relation("questoesObjetivas")
  })
})

builder.prismaObject("QuestaoObjetiva", {
  findUnique: (questao) => ({ id: questao.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    enunciado: t.exposeString("enunciado"),
    alternativas: t.relation("alternativas")
  })
})

builder.prismaObject("Alternativa", {
  findUnique: (questao) => ({ id: questao.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    enunciado: t.exposeString("enunciado"),
    correta: t.exposeBoolean("correta")
  })
})

builder.mutationField("createCasoClinico", (t) =>
  t.prismaField({
    type: "CasoClinico",
    args: {
      enunciado: t.arg.string({ required: true })
    },
    authScopes: {
      loggedIn: true
    },
    resolve: (query, _root, { enunciado }) => {
      return prisma.casoClinico.create({
        ...query,
        data: {
          enunciado
        }
      })
    }
  })
)

builder.queryField("casoClinico", (t) =>
  t.prismaField({
    type: "CasoClinico",
    args: {
      id: t.arg.int({ required: true })
    },
    resolve: (query, _root, { id }) => {
      return prisma.casoClinico.findUniqueOrThrow({
        ...query,
        where: { id }
      })
    }
  })
)

builder.queryField("casosClinicos", (t) =>
  t.prismaField({
    type: ["CasoClinico"],
    resolve: (query) => {
      return prisma.casoClinico.findMany({
        ...query
      })
    }
  })
)
