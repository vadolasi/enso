import { Exchange, cacheExchange, createClient, fetchExchange } from "@urql/core"
import { persistedExchange } from "@urql/exchange-persisted"
import { registerUrql } from "@urql/next/rsc"
import { authExchange } from "@urql/exchange-auth"
import useAuth, { useAuthClient } from "./useAuth"
import { useSession } from "next-auth/react"

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

const _makeClientWithAuth = (isLoggedIn: boolean, apiToken: string) => {
  return makeClient([
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

export const makeClientWithAuth = () => {
  const { isLoggedIn, apiToken } = useAuthClient()
  console.log(isLoggedIn, apiToken)

  return _makeClientWithAuth(isLoggedIn, apiToken!)
}

const getClientWithAuth = async () => {
  const { isLoggedIn, apiToken } = await useAuth()

  return () => _makeClientWithAuth(isLoggedIn, apiToken!)
}

export const getClient = async () => registerUrql(await getClientWithAuth()).getClient()
