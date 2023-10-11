import { graphql } from "@/gql"
import { getClient } from "@/lib/urql"
import { NextPage } from "next"

const getQuestionQuery = graphql(/* GraphQL */`
  query getQuestionForAdmin($questionId: Int!) {
    casoClinico(id: $questionId) {
      enunciado
      questoes {
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
        <h1>d</h1>
      )}
    </div>
  )
}

export default Page
