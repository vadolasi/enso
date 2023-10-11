import { NextPage } from "next"
import CasoClinicoForm, { FormData } from "../../novo/components/CasoClinicoForm"
import { graphql } from "@/gql"

const getQuestionQuery = graphql(/* GraphQL */`
  query getQuestionFoAdmin($questionId: Int!) {
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

const Page: NextPage<{ params: { questionId: string } }> = async ({ params: { questionId } }) => {
  const onSubmit = async ({ enunciado, enunciadoDelta, perguntas }: FormData) => {
  }

  return (
    <div className="w-full lg:w-2/3 xl:w-2/3">
      <h1>Editar</h1>
      <CasoClinicoForm onSubmit={onSubmit} />
    </div>
  )
}

export default Page
