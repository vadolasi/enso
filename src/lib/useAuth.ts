import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"
import { useSession } from "next-auth/react"

export default async function useAuth() {
  const session = await getServerSession(authOptions)

  return {
    isLoggedIn: !!session?.user,
    name: session?.user?.name as string | undefined,
    apiToken: (session?.user as any)?.apiToken as string | undefined,
    cargo: (session?.user as any)?.cargo as string | undefined
  }
}

export function useAuthClient() {
  const { data: session } = useSession()

  return {
    isLoggedIn: !!session?.user,
    name: session?.user?.name as string | undefined,
    apiToken: (session?.user as any)?.apiToken as string | undefined,
    cargo: (session?.user as any)?.cargo as string | undefined
  }
}
