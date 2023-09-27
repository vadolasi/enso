import React from "react"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="h-screen flex items-center justify-center overflow-y-auto">
      {children}
    </main>
  )
}

export default Layout
