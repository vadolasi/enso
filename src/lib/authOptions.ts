import { graphql } from "@/gql"
import { makeClient } from "@/lib/urql"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"

const LoginMutation = graphql(/* GraphQL */`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        nome
        cargo
      }
    }
  }
`)

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
          const client = makeClient()
          const { email, password } = credentials
          const { data, error } = await client.mutation(LoginMutation, { email, password }).toPromise()

          if (error) {
            return null
          } else {
            const { login: { token, user: { email, id, nome, cargo } } } = data!
            return { email, id, apiToken: token, name: nome, cargo }
          }
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
