import { graphql } from "@/gql"
import { getClient } from "@/lib/urql"
import type { NextPage } from "next"

const getQuestionQuery = graphql(/* GraphQL */`
  query getQuestion($questionId: Int!) {
    question(id: $questionId) {
      id
    }
  }
`)

const Page: NextPage<{ params: { questionId: string} }> = async ({ params: { questionId } }) => {
  const client = await getClient()

  const { data } = await client.query(getQuestionQuery, { questionId: parseInt(questionId) })

  return (
    <h1>{JSON.stringify(data)}</h1>
  )
}

export default Page
