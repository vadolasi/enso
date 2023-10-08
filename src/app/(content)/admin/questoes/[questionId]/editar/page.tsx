"use client"

import { NextPage } from "next"

const Page: NextPage<{ params: { questionId: string } }> = async ({ params: { questionId } }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: data.casoClinico.enunciado }} />
      <Questions questions={data.casoClinico.questoesObjetivas} />
    </div>
  )
}

export default Page
