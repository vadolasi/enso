import prisma from "@/lib/prisma"
import builder from "../builder"

builder.prismaObject("QuestaoObjetiva", {
  findUnique: (questao) => ({ id: questao.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    enunciado: t.exposeString("enunciado")
  })
})

builder.queryField("question", (t) =>
  t.prismaField({
    type: "QuestaoObjetiva",
    args: {
      id: t.arg.int({ required: true })
    },
    authScopes: {
      loggedIn: true
    },
    resolve: (query, _root, { id }) => {
      return prisma.questaoObjetiva.findUniqueOrThrow({
        ...query,
        where: { id }
      })
    }
  })
)
