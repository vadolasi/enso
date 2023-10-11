"use client"

import { makeClientWithAuth } from "@/lib/urql"
import { Provider } from "urql"

const ClientProvier: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = makeClientWithAuth()

  return (
    <Provider value={client}>
      {children}
    </Provider>
  )
}

export default ClientProvier
