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
import { printSchema, lexicographicSortSchema } from "graphql"
import { initContextCache } from "@pothos/core"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

const redis = new Redis(process.env.REDIS_URL!, { enableTLSForSentinelMode: false })

const cache = createRedisCache({ redis })

writeFileSync("schema.gql", printSchema(lexicographicSortSchema(schema)))

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
  fetchAPI: { Response },
  context: async ({ request }) => {
    const token = (request.headers.get("Authorization") ?? " ").split(" ")[1]

    let currentUser = null

    if (token) {
      const { sub } = await new Promise<{ sub: number }>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
          if (err) {
            reject(err)
          } else {
            resolve(decoded as unknown as { sub: number })
          }
        })
      })

      currentUser = await prisma.user.findUnique({ where: { id: sub } })
    }

    return {
      ...initContextCache(),
      currentUser
    }
  }
})

export { handleRequest as GET, handleRequest as POST }
