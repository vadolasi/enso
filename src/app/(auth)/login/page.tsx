"use client"

import type { NextPage } from "next"
import Input from "@/app/components/Input"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"

const schema = yup
  .object({
    email: yup.string().required("Este campo é obrigatório"),
    password: yup.string().required("Este campo é obrigatório")
  })
  .required()

type FormData = yup.InferType<typeof schema>

const Page: NextPage<{ searchParams: { callbackUrl?: string, error?: "CredentialsSignin" } }> = ({
  searchParams: { callbackUrl, error }
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    // @ts-ignore
    resolver: yupResolver(schema),
    mode: "onBlur"
  })

  const [loading, setLoading] = useState(false)

  const errorMessages = {
    "CredentialsSignin": "Credenciais inválidas"
  }

  const onSubmit = handleSubmit(async data => {
    setLoading(true)
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? "/home"
      })
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col gap-10">
      {error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessages[error]}</span>
        </div>
      )}
      <form className="card border m-10 md:m-0 w-full rounded-2xl" onSubmit={onSubmit}>
        <div className="card-body items-center text-center">
          <h1 className="card-title text-center">Entrar</h1>
          <Input label="Email" {...register("email")} error={errors.email} />
          <Input label="Senha" type="password" {...register("password")} error={errors.password} />
          <div className="card-actions mt-5 w-full">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Entrar"}
            </button>
          </div>
          <span className="text-center text-sm text-neutral mt-5">
            Não tem uma conta? <Link href="/register" className="text-info underline">Cadastre-se</Link>
          </span>
          <span className="text-center text-sm text-neutral">
            <Link href="/forgot-password" className="text-info underline">Esqueceu sua senha?</Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Page
