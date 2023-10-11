"use client"

import { graphql } from "@/gql"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useMutation } from "urql"

interface IProps {
  questions: {
    id: string
    enunciado: string
    alternativas: {
      id: string
      enunciado: string
      correta: boolean
    }[]
  }[]
}

const resolveQuestionMutation = graphql(/* GraphQL */ `
  mutation ResponderCasoClinico($id: Int!, $respostas: [Int!]!) {
    responderCasoClinico(id: $id, respostas: $respostas) {
      corretas
      total
    }
  }
`)

const Questions: React.FC<IProps> = ({ questions }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const [resolved, setResolved] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)

  const [selected, _setSelected] = useState<{ [key: string]: string }>({})

  const [{ fetching }, execute] = useMutation(resolveQuestionMutation)

  const setSelected = (question: string, alternativa: string) => {
    _setSelected({ ...selected, [question]: alternativa })
  }

  useEffect(() => {
    ;(async () => {
      if (resolved) {
        const respostas = Object.entries(selected).map(([_, value]) => parseInt(value))

        const { data, error } = await execute({ id: parseInt(questions[0].id), respostas })
      }
    })()
  }, [resolved])

  return (
    <div className="w-full">
      {showQuestions && (
        <div className="w-full flex flex-col divide-y mt-10">
          {questions.map(question => (
            <div key={question.id} className="py-5">
              <div className="prose prose-sm lg:prose-md xl:prose-lg" dangerouslySetInnerHTML={{ __html: question.enunciado }} />
              <div className="flex gap-2 flex-col mt-2">
                {question.alternativas.map((alternativa, index) => (
                  <div key={alternativa.id} className="flex items-center gap-2">
                    <label className={clsx("btn btn-sm btn-outline btn-square rounded-full", selected[question.id] === alternativa.id && "btn-active")}>
                      <input type="radio" name={question.id} className="hidden" id={alternativa.id} onChange={() => setSelected(question.id, alternativa.id)} checked={selected[question.id] === alternativa.id} />
                      <span>{alphabet[index]}</span>
                    </label>
                    <label htmlFor={alternativa.id} className="prose prose-xl md:prose-sm lg:prose-md xl:prose-l cursor-pointer" dangerouslySetInnerHTML={{ __html: alternativa.enunciado }}></label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex justify-end mt-10 gap-4">
        {showQuestions && (
          <button className="btn btn-secondary btn-block lg:w-auto" onClick={() => setResolved(true)} disabled={resolved && fetching}>Responder</button>
        )}
        <button className="btn btn-primary btn-block lg:w-auto" onClick={() => setShowQuestions(!showQuestions)}>{showQuestions ? "Ocultar" : "Mostrar"} questões</button>
      </div>
    </div>
  )
}

export default Questions
