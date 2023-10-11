"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useForm, useFieldArray, Control, UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form"
import * as yup from "yup"
import Editor from "./Editor"
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa"
import clsx from "clsx"

const schema = yup.object({
  enunciado: yup.string().required(),
  enunciadoDelta: yup.object().required(),
  perguntas: yup.array().of(yup.object({
    id: yup.number(),
    enunciado: yup.string().required(),
    enunciadoDelta: yup.object().required(),
    alternativas: yup.array().of(yup.object({
      id: yup.number(),
      enunciado: yup.string().required(),
      enunciadoDelta: yup.object().required(),
      correta: yup.boolean().required()
    }).required()).required().min(2)
  }).required()).required().min(1)
}).required()
export type FormData = yup.InferType<typeof schema>

const Pergunta: React.FC<{
  index: number,
  control: Control<FormData>,
  register: UseFormRegister<FormData>,
  watch: UseFormWatch<FormData>,
  setValue: UseFormSetValue<FormData>,
  errors: FieldErrors<FormData>
}> = ({ index, control, register, watch, setValue, errors }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const { fields, remove, append } = useFieldArray({
    name: `perguntas.${index}.alternativas`,
    control
  })

  const corretas = watch(`perguntas.${index}.alternativas`, [])

  return (
    <div className="flex flex-col gap-4">
      <Editor label="Enunciado" control={control} name={`perguntas.${index}.enunciado`} />
      {fields.map((field, index2) => (
        <div key={field.id} className="flex gap-4 items-center">
          <label className={clsx("btn btn-sm btn-outline btn-square rounded-full", corretas[index2]?.correta && "btn-active")}>
            <input type="checkbox" {...register(`perguntas.${index}.alternativas.${index2}.correta` as const)} className="hidden" />
            <span>{alphabet[index2]}</span>
          </label>
          <div className="w-full flex-1">
            <Editor control={control} name={`perguntas.${index}.alternativas.${index2}.enunciado`} onChange={(_, delta) => setValue(`perguntas.${index}.alternativas.${index2}.enunciadoDelta`, delta)} />
          </div>
          <div className="flex h-full">
            <button className="btn btn-sm btn-outline btn-square rounded-full"><FaArrowUp /></button>
            <button className="btn btn-sm btn-outline btn-square rounded-full"><FaArrowDown /></button>
          </div>
          <button className="btn btn-sm btn-error btn-square btn-outline" onClick={() => remove(index2)}><FaTrash /></button>
        </div>
      ))}
      <button className="btn btn-sm btn-outline" onClick={() => append({ enunciado: "", correta: false, enunciadoDelta: {} })}>Adicionar alternativa</button>
    </div>
  )
}

const CasoClinicoForm: React.FC<{ onSubmit?: (data: FormData) => void, loading?: boolean, defaultValues?: FormData }> = ({ onSubmit, loading, defaultValues }) => {
  const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm<FormData>({
    // @ts-ignore
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues
  })

  const { fields, append, remove } = useFieldArray({
    name: "perguntas",
    control
  })

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit || (() => {}))}>
      <Editor label="Enunciado" control={control} name="enunciado" onChange={(_, delta) => setValue("enunciadoDelta", delta)} />
      <label htmlFor="perguntas">Perguntas</label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-center">
          <div className="w-full flex-1 border-r pr-4">
            <Pergunta index={index} control={control} register={register} watch={watch} setValue={setValue} errors={errors} />
          </div>
          <button className="btn btn-sm h-full btn-error btn-outline btn-square" onClick={() => remove(index)}><FaTrash /></button>
        </div>
      ))}
      <button className="btn btn-sm btn-secondary" onClick={() => append({ enunciado: "", alternativas: [], enunciadoDelta: {} })}>Adicionar pergunta</button>
      <button className="btn btn-primary btn-block" disabled={loading}>Cadastrar</button>
    </form>
  )
}

export default CasoClinicoForm
