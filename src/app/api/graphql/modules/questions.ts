import prisma from "@/lib/prisma"
import builder from "../builder"
import { db } from "../database"
import { cache } from "../cache"

builder.prismaObject("CasoClinico", {
  findUnique: (questao) => ({ id: questao.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    enunciado: t.exposeString("enunciado"),
    questoes: t.relation("questoes")
  })
})

builder.prismaObject("Questao", {
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
    correta: t.exposeBoolean("correta", { authScopes: { admin: true } })
  })
})

const createAlternativaInput = builder.inputType("CreateAlternativaInput", {
  fields: (t) => ({
    enunciado: t.string({ required: true }),
    enunciadoDelta: t.string({ required: true }),
    correta: t.boolean({ required: true })
  })
})

const createQuestaoInput = builder.inputType("CreateQuestaoInput", {
  fields: (t) => ({
    enunciado: t.string({ required: true }),
    enunciadoDelta: t.string({ required: true }),
    alternativas: t.field({ type: [createAlternativaInput], required: true })
  })
})

builder.mutationField("createCasoClinico", (t) =>
  t.prismaField({
    type: "CasoClinico",
    args: {
      enunciado: t.arg.string({ required: true }),
      enunciadoDelta: t.arg.string({ required: true }),
      questoes: t.arg({ type: [createQuestaoInput], required: true })
    },
    authScopes: {
      admin: true
    },
    resolve: async (_query, _root, { enunciado, enunciadoDelta, questoes }) => {
      return await db.transaction().execute(async (trx) => {
        const casoClinico = await trx.insertInto("CasoClinico")
          .values({ enunciado, enunciadoDelta })
          .returningAll()
          .executeTakeFirstOrThrow()

        const ids = await trx.insertInto("Questao")
          .values(questoes.map(questao => ({
            casoClinicoId: casoClinico.id,
            enunciado: questao.enunciado,
            enunciadoDelta: questao.enunciadoDelta,
            tipo: "OBJETIVA"
          })))
          .returning("id")
          .execute()

        await trx.insertInto("Alternativa")
          .values(questoes.flatMap((questao, i) => questao.alternativas.map(alternativa => ({
            questaoId: ids[i].id,
            enunciado: alternativa.enunciado,
            enunciadoDelta: alternativa.enunciadoDelta,
            correta: alternativa.correta
          }))))
          .execute()

        return casoClinico
      })
    }
  })
)

const updateCasoClinicoQuestaoInput = builder.inputType("UpdateCasoClinicoQuestaoInput", {
  fields: (t) => ({
    id: t.int({ required: true }),
    create: t.field({ type: [createQuestaoInput] }),
    update: t.field({
      type: [
        builder.inputType("UpdateCasoClinicoQuestao", {
          fields: (t) => ({
            id: t.int({ required: true }),
            enunciado: t.string(),
            enunciadoDelta: t.string(),
            alternativas: t.field({
              type: builder.inputType("UpdateCasoClinicoQuestaoAlternativaInput", {
                  fields: (t) => ({
                    create: t.field({ type: [createAlternativaInput] }),
                    update: t.field({
                      type: [
                        builder.inputType("UpdateCasoClinicoQuestaoAlternativa", {
                          fields: (t) => ({
                            id: t.int({ required: true }),
                            enunciado: t.string(),
                            enunciadoDelta: t.string(),
                            correta: t.boolean()
                          })
                        })
                      ]
                    }),
                    delete: t.idList()
                  })
                })
            })
          })
        })
      ]
    }),
    delete: t.idList()
  })
})

const updateCasoClinicoInput = builder.inputType("UpdateCasoClinicoInput", {
  fields: (t) => ({
    enunciado: t.string({ required: false }),
    enunciadoDelta: t.string(),
    questoes: t.field({ type: updateCasoClinicoQuestaoInput })
  })
})

builder.mutationField("updateCasoClinico", (t) =>
  t.prismaField({
    type: "CasoClinico",
    args: {
      id: t.arg.int({ required: true }),
      data: t.arg({ type: updateCasoClinicoInput, required: true })
    },
    authScopes: {
      admin: true
    },
    resolve: async (_query, _root, { id, data }) => {
      await cache.invalidate([{ typename: "CasoClinico", id }])

      return await db.transaction().execute(async (trx) => {
        const casoClinico = await trx.selectFrom("CasoClinico")
          .selectAll()
          .where("id", "=", id)
          .executeTakeFirstOrThrow()

        if (data.enunciado === null) data.enunciado = undefined
        if (data.enunciadoDelta === null) data.enunciadoDelta = undefined

        if (data.enunciado || data.enunciadoDelta) {
          await trx.updateTable("CasoClinico")
            .set({ enunciado: data.enunciado, enunciadoDelta: data.enunciadoDelta })
            .where("id", "=", id)
            .execute()
        }

        if (data.questoes?.create) {
          await trx.insertInto("Questao")
            .values(data.questoes.create.map(questao => ({
              casoClinicoId: id,
              enunciado: questao.enunciado,
              enunciadoDelta: questao.enunciadoDelta,
              tipo: "OBJETIVA"
            })))
            .execute()
        }

        data.questoes?.update?.forEach(async (questao) => {
          if (questao.enunciado === null) questao.enunciado = undefined
          if (questao.enunciadoDelta === null) questao.enunciadoDelta = undefined

          if (questao.enunciado || questao.enunciadoDelta) {
            await trx.updateTable("Questao")
              .set({ enunciado: questao.enunciado, enunciadoDelta: questao.enunciadoDelta })
              .where("id", "=", questao.id)
              .execute()
          }

          if (questao.alternativas?.create) {
            await trx.insertInto("Alternativa")
              .values(questao.alternativas.create.map(alternativa => ({
                questaoId: questao.id,
                enunciado: alternativa.enunciado,
                enunciadoDelta: alternativa.enunciadoDelta,
                correta: alternativa.correta
              })))
              .execute()
          }

          questao.alternativas?.update?.forEach(async (alternativa) => {
            if (alternativa.enunciado === null) alternativa.enunciado = undefined
            if (alternativa.enunciadoDelta === null) alternativa.enunciadoDelta = undefined
            if (alternativa.correta === null) alternativa.correta = undefined

            if (alternativa.enunciado || alternativa.enunciadoDelta || alternativa.correta) {
              await trx.updateTable("Alternativa")
                .set({ enunciado: alternativa.enunciado, enunciadoDelta: alternativa.enunciadoDelta, correta: alternativa.correta })
                .where("id", "=", alternativa.id)
                .execute()
            }
          })

          if (questao.alternativas?.delete) {
            await trx.deleteFrom("Alternativa")
              .where("id", "in", questao.alternativas.delete.map(alternativa => Number(alternativa)))
              .execute()
          }
        })

        if (data.questoes?.delete) {
          await trx.deleteFrom("Questao")
            .where("id", "in", data.questoes.delete.map(questao => Number(questao)))
            .execute()
        }

        return casoClinico
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

interface Resultado {
  corretas: number[]
  total: number
}

builder.mutationField("responderCasoClinico", (t) =>
  t.field({
    authScopes: {
      loggedIn: true
    },
    args: {
      id: t.arg.int({ required: true }),
      respostas: t.arg({ type: ["Int"], required: true })
    },
    type: builder.objectRef<Resultado>("Resultado").implement({
      fields: (t) => ({
        corretas: t.exposeIntList("corretas"),
        total: t.exposeInt("total")
      })
    }),
    resolve: async (_root, { id, respostas }, { currentUser }) => {
      const casoClinico = await prisma.casoClinico.findUnique({ where: { id }, include: { questoes: { include: { alternativas: true } } } })

      await prisma.resposta.createMany({
        data: casoClinico!.questoes.map((questao, i) => ({
          alternativaId: questao.alternativas[respostas[i]].id,
          tipo: "OBJETIVA",
          usuarioId: Number(currentUser.id),
          correto: questao.alternativas[respostas[i]].correta,
          questaoId: questao.id
        }))
      })

      return {
        corretas: casoClinico!.questoes.map((questao, i) => questao.alternativas.findIndex(alternativa => alternativa.correta) === respostas[i] ? 1 : 0),
        total: casoClinico!.questoes.length
      }
    }
  })
)
