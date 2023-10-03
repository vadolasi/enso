import builder from "../builder"
import prisma from "@/lib/prisma"
import { Cargo } from "@prisma/client";
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"

builder.enumType(Cargo, { name: "Cargo" })

const User = builder.prismaObject("User", {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID("id", { nullable: false }),
    email: t.exposeString("email", { nullable: false }),
    nome: t.exposeString("nome", { nullable: false }),
    cargo: t.expose("cargo", { type: Cargo, nullable: false })
  })
})

const LoginResult = builder.simpleObject("LoginResult", {
  fields: (t) => ({
    token: t.string({ nullable: false }),
    user: t.field({ type: User, nullable: false })
  })
})

builder.mutationField("login", (t) =>
  t.field({
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true })
    },
    type: LoginResult,
    resolve: async (_root, args) => {
      const { email, password } = args

      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (user) {
        const valid = await compare(password, user.senha!)

        if (valid) {
          const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET!,
            {
              expiresIn: "7d"
            }
          )

          return { token, user }
        } else {
          throw new Error("Invalid password")
        }
      } else {
        throw new Error("User not found")
      }
    }
  })
)
