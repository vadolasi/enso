import Link from "next/link"
import React from "react"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen flex flex-col">
        <div className="navbar h-16 bg-base-100 border-b flex items-center">
          <a className="btn btn-ghost normal-case text-xl lg:hidden">Enso</a>
        </div>
        <main className="flex items-center justify-center flex-1 h-full overflow-y-auto">
          {children}
          <label htmlFor="drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        </main>
      </div>
      <div className="drawer-side flex flex-col overflow-hidden">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <div className="h-16 bg-base-100 border-b hidden lg:flex items-center">
          <a className="btn btn-ghost normal-case text-xl">Enso</a>
        </div>
        <div className="bg-base-100 border-r h-full flex-1">
          <ul className="menu p-4 w-80 min-h-full text-base-content">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Cadastra questão</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Layout
