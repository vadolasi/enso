import { graphql } from "@/gql"
import { getClient } from "@/lib/urql"
import Link from "next/link"

const getQuestionsQuery = graphql(/* GraphQL */ `
  query GetCasosClinicosForAdmin {
    casosClinicos {
      id
      enunciado
      questoes {
        id
        enunciado
        alternativas {
          id
          enunciado
        }
      }
    }
  }
`)

export default async () => {
  const client = await getClient()

  const { data, error } = await client.query(getQuestionsQuery, {})

  return (
    <div className="w-1/2 flex flex-col items-center justify-center">
      <span>{data?.casosClinicos.length} questões cadastradas</span>
      <ul className="w-full flex flex-col divide-y my-4">
        {data?.casosClinicos.map(question => (
          <li key={question.id} className="w-full py-2">
            <Link href={`/admin/questoes/${question.id}/editar`}>
              <div dangerouslySetInnerHTML={{ __html: question.enunciado }} className="overflow-hidden max-w-1/2 max-h-20 line-clamp-2"></div>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/admin/questoes/novo" className="btn btn-primary">Adiconar questão</Link>
    </div>
  )
}
