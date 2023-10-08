"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useForm, useFieldArray, Control, UseFormRegister } from "react-hook-form"
import * as yup from "yup"
import Editor from "./components/Editor"
import { FaPlus, FaTrash } from "react-icons/fa"

const schema = yup.object({
  enunciado: yup.string().required(),
  perguntas: yup.array().of(yup.object({
    enunciado: yup.string().required(),
    alternativas: yup.array().of(yup.object({
      enunciado: yup.string().required(),
      correta: yup.boolean().required()
    }).required()).required()
  }).required()).required()
}).required()
type FormData = yup.InferType<typeof schema>

const Pergunta: React.FC<{ index: number, control: Control<FormData>, register: UseFormRegister<FormData> }> = ({ index, control, register }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const { fields, remove, append } = useFieldArray({
    name: `perguntas.${index}.alternativas`,
    control
  })

  return (
    <div className="flex flex-col gap-4">
      <Editor label="Enunciado" control={control} name={`perguntas.${index}.enunciado`} />
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-center">
          <div className="rounded-full border w-8 h-8 flex items-center justify-center">{alphabet[index]}</div>
          <div className="w-full flex-1">
            <Editor control={control} name={`perguntas.${index}.alternativas.${index}.enunciado`} />
          </div>
          <input type="checkbox" {...register(`perguntas.${index}.alternativas.${index}.correta` as const)} className="checkbox" />
          <button className="btn btn-sm btn-error btn-square btn-outline" onClick={() => remove(index)}><FaTrash /></button>
        </div>
      ))}
      <button className="btn btn-sm btn-outline" onClick={() => append({ enunciado: "", correta: false })}>Adicionar alternativa</button>
    </div>
  )
}

export default () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
    // @ts-ignore
    resolver: yupResolver(schema)
  })

  const { fields, append, remove } = useFieldArray({
    name: "perguntas",
    control
  })

  const onSubmit = handleSubmit((data) => {})

  return (
    <div className="w-full lg:w-2/3 xl:w-2/3">
      <h1>Cadastrar questão</h1>
      <Link href="/admin/questoes/novo/carregarLote" className="btn btn-sm btn-primary">Carregar via planilha</Link>
      <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
        <Editor label="Enunciado" control={control} name="enunciado" />
        <label htmlFor="perguntas">Perguntas</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center">
            <div className="w-full flex-1 border-r pr-4">
              <Pergunta index={index} control={control} register={register} />
            </div>
            <button className="btn btn-sm h-full btn-error btn-outline btn-square" onClick={() => remove(index)}><FaTrash /></button>
          </div>
        ))}
        <button className="btn btn-sm btn-secondary" onClick={() => append({ enunciado: "", alternativas: [] })}>Adicionar pergunta</button>
      </form>
    </div>
  )
}
