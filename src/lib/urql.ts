import { Exchange, cacheExchange, createClient, fetchExchange } from "@urql/core"
import { persistedExchange } from "@urql/exchange-persisted"
import { registerUrql } from "@urql/next/rsc"
import { authExchange } from "@urql/exchange-auth"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./authOptions"
import useAuth from "./useAuth"

export const makeClient = (extraExchanges: Exchange[] = []) => {
  return createClient({
    url: "http://localhost:3000/api/graphql",
    exchanges: [
      cacheExchange,
      ...extraExchanges,
      persistedExchange({
        preferGetForPersistedQueries: true
      }),
      fetchExchange
    ]
  })
}

const authClientGenerator = async () => {
  const { isLoggedIn, apiToken } = await useAuth()

  return () => makeClient([
    authExchange(async utils => ({
      addAuthToOperation(operation) {
        if (!isLoggedIn) return operation

        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${apiToken}`
        })
      },
      didAuthError(error) {
        return error.graphQLErrors.some(e => e.extensions?.code === "FORBIDDEN")
      },
      refreshAuth: async () => {}
    }))
  ])
}

export const getClient = async () => registerUrql(await authClientGenerator()).getClient()
