import { createYoga } from "graphql-yoga"
import { schema } from "./schema"
import { renderGraphiQL } from "@graphql-yoga/render-graphiql"
import { useResponseCache } from "@graphql-yoga/plugin-response-cache"

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  renderGraphiQL,
  batching: true,
  plugins: [
    /*useResponseCache({
      session: () => null
    })*/
  ]
})

export { handleRequest as GET, handleRequest as POST }
