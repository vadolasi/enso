"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default () => {
  const router = useRouter()

  return (
    <div>
      <span>10 questões cadastradas</span>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Enunciado</th>
          </tr>
        </thead>
        <tbody>
          <tr className="cursor-pointer hover:bg-base-200" onClick={() => router.push("/admin/questoes/1")}>
            <th>1</th>
            <th>Qual a capital do Brasil?</th>
          </tr>
        </tbody>
      </table>
      <Link href="/admin/questoes/novo" className="btn btn-primary">Adiconar questão</Link>
    </div>
  )
}
