"use client"

import type { NextPage } from "next"
import Input from "@/app/components/Input"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    email: yup.string().required("Este campo é obrigatório"),
    password: yup.string().required("Este campo é obrigatório")
  })
  .required()

type FormData = yup.InferType<typeof schema>

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    // @ts-ignore
    resolver: yupResolver(schema),
    mode: "onBlur"
  })

  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <form className="card border m-10 md:m-0 w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 rounded-lg" onSubmit={onSubmit}>
      <div className="card-body items-center text-center">
        <h1 className="card-title text-center">Entrar</h1>
        <Input label="Email" {...register("email")} error={errors.email} />
        <Input label="Senha" type="password" {...register("password")} error={errors.password} />
        <div className="card-actions mt-5 w-full">
          <button className="btn btn-primary btn-block">Entrar</button>
        </div>
      </div>
    </form>
  )
}

export default Page
