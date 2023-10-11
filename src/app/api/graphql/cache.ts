import { createRedisCache } from "@envelop/response-cache-redis"
import Redis from "ioredis"

export const redis = new Redis(process.env.REDIS_URL!, { enableTLSForSentinelMode: false })

export const cache = createRedisCache({ redis })
