"use client"

import CasoClinicoForm, { FormData } from "./components/CasoClinicoForm"
import { graphql } from "@/gql"
import { useMutation } from "urql"

const createQuestionMutation = graphql(/* GraphQL */ `
  mutation CreateCasoClinico(
    $enunciado: String!,
    $enunciadoDelta: String!,
    $questoes: [CreateQuestaoInput!]!
  ) {
    createCasoClinico(
      enunciado: $enunciado
      enunciadoDelta: $enunciadoDelta
      questoes: $questoes
    ) {
      id
    }
  }
`)

export default () => {
  const [{ fetching }, execute] = useMutation(createQuestionMutation);

  const onSubmit = async ({ enunciado, enunciadoDelta, perguntas }: FormData) => {
    await execute({
      enunciado,
      enunciadoDelta: JSON.stringify(enunciadoDelta),
      questoes: perguntas.map(({ enunciado, enunciadoDelta, alternativas }) => ({
        enunciado,
        enunciadoDelta: JSON.stringify(enunciadoDelta),
        alternativas: alternativas.map(({ enunciado, enunciadoDelta, correta }) => ({
          enunciado,
          enunciadoDelta: JSON.stringify(enunciadoDelta),
          correta
        }))
      }))
    })
  }

  return (
    <div className="w-full lg:w-2/3 xl:w-2/3">
      <h1>Cadastrar questão</h1>
      <CasoClinicoForm onSubmit={onSubmit} loading={fetching} />
    </div>
  )
}
