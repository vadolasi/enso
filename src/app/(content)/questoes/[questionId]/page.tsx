import { graphql } from "@/gql"
import { getClient } from "@/lib/urql"
import type { NextPage } from "next"
import Questions from "./components/Questions"

const getQuestionQuery = graphql(/* GraphQL */`
  query getQuestionForUser($questionId: Int!) {
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
    <div className="w-full">
      {error && <p>{error.message}</p>}
      {data && (
        <div className="w-full">
          <div dangerouslySetInnerHTML={{ __html: data.casoClinico.enunciado }} className="prose prose-sm lg:prose-md xl:prose-lg" />
          <Questions questions={data.casoClinico.questoes} />
        </div>
      )}
    </div>
  )
}

export default Page
