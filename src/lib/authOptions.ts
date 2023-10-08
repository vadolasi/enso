import type { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials) {
        if (credentials) {
          const { email, password } = credentials
          const user = await prisma.user.findUnique({ where: { email } })

          if (!user) {
            return null
          }

          const valid = await compare(password, user.senha!)

          if (!valid) {
            return null
          }

          const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET!,
            {
              expiresIn: "7d"
            }
          )

          return { apiToken: token, id: user.id.toString(), email: user.email, name: user.nome, cargo: user.cargo }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages:{
    signIn: "/login"
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          apiToken: token.apiToken,
          cargo: token.cargo
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          apiToken: u.apiToken,
          cargo: u.cargo
        }
      }

      return token
    }
  },
  adapter: PrismaAdapter(prisma)
}
