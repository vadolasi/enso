"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ClientProvider from "./clientProvider"

const Providers: React.FC<{ children: React.ReactNode, session: Session | null }> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ClientProvider>
        {children}
        <ToastContainer />
      </ClientProvider>
    </SessionProvider>
  )
}

export default Providers
