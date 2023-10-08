import { graphql } from "@/gql"
import { getClient } from "@/lib/urql"
import type { NextPage } from "next"
import Questions from "./components/Questions"

const getQuestionQuery = graphql(/* GraphQL */`
  query getQuestionForUser($questionId: Int!) {
    casoClinico(id: $questionId) {
      enunciado
      questoesObjetivas {
        id
        enunciado
        alternativas {
          id
          enunciado
          correta
        }
      }
    }
  }
`)

const Page: NextPage<{ params: { questionId: string} }> = async ({ params: { questionId } }) => {
  const client = await getClient()

  const { data, error } = await client.query(getQuestionQuery, { questionId: parseInt(questionId) })

  return (
    <div>
      {error && <p>{error.message}</p>}
      {data && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: data.casoClinico.enunciado }} />
          <Questions questions={data.casoClinico.questoesObjetivas} />
        </div>
      )}
    </div>
  )
}

export default Page
