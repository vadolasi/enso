import { createYoga } from "graphql-yoga"
import schema from "./schema"
import { useGraphQlJit as GraphQLJit } from "@envelop/graphql-jit"
import { renderGraphiQL } from "@graphql-yoga/render-graphiql"
import { useResponseCache as ResponseCache } from "@graphql-yoga/plugin-response-cache"
import { createRedisCache } from "@envelop/response-cache-redis"
import { useAPQ as APQ } from "@graphql-yoga/plugin-apq"
import { useRateLimiter as RateLimiter } from "@envelop/rate-limiter"
import Redis from "ioredis"
import { writeFileSync } from "fs"
import { printSchema } from "graphql"

const redis = new Redis(process.env.REDIS_URL!, { enableTLSForSentinelMode: false })

const cache = createRedisCache({ redis })

writeFileSync("schema.gql", printSchema(schema))

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  batching: true,
  plugins: [
    GraphQLJit(),
    ResponseCache({
      session: () => null,
      // @ts-ignore
      cache
    }),
    APQ({ store: redis }),
    RateLimiter({ identifyFn: ctx => "id" })
  ],
  renderGraphiQL,
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST }
