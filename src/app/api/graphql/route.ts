import { createYoga } from "graphql-yoga"
import schema from "./schema"
import { useGraphQlJit } from "@envelop/graphql-jit"
import { renderGraphiQL } from "@graphql-yoga/render-graphiql"
import { useResponseCache } from "@graphql-yoga/plugin-response-cache"
import { createRedisCache } from "@envelop/response-cache-redis"
import { useAPQ } from "@graphql-yoga/plugin-apq"
import { useRateLimiter } from "@envelop/rate-limiter"
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
    useGraphQlJit(),
    useResponseCache({
      session: () => null,
      // @ts-ignore
      cache
    }),
    useAPQ({ store: redis }),
    useRateLimiter({ identifyFn: ctx => "id" })
  ],
  renderGraphiQL,
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST }
