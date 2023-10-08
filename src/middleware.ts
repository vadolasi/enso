import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware (req) {
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-pathname", req.nextUrl.pathname)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (
          !["/", "/login", "/register"].includes(req.nextUrl.pathname) &&
          !req.nextUrl.pathname.startsWith("/api") &&
          token === null
        ) {
          return false
        }
        return true
      }
    }
  }
)
