"use client"

import { useState } from "react"

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

const Questions: React.FC<IProps> = ({ questions }) => {
  const [showQuestions, setShowQuestions] = useState(false)

  return (
    <div>
      {showQuestions && (
        <div>
          {questions.map(question => (
            <div key={question.id} className="my-10">
              <div dangerouslySetInnerHTML={{ __html: question.enunciado }} />
              <div className="grid grid-cols-2 gap-4">
                {question.alternativas.map(alternativa => (
                  <div key={alternativa.id} className="flex items-center">
                    <input type="radio" name={question.id} id={alternativa.id} />
                    <label htmlFor={alternativa.id} className="ml-2">{alternativa.enunciado}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex justify-end mt-10">
        <button className="btn btn-primary btn-block lg:w-auto" onClick={() => setShowQuestions(!showQuestions)}>{showQuestions ? "Ocultar" : "Mostrar"} questões</button>
      </div>
    </div>
  )
}

export default Questions
