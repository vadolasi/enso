import { cacheExchange, createClient, fetchExchange } from "@urql/core"
import { persistedExchange } from "@urql/exchange-persisted"
import { registerUrql } from "@urql/next/rsc"

const makeClient = () => {
  return createClient({
    url: "http://localhost:3000/api/graphql",
    exchanges: [
      cacheExchange,
      persistedExchange({
        preferGetForPersistedQueries: true
      }),
      fetchExchange
    ]
  })
}

const { getClient } = registerUrql(makeClient)

export default getClient
