"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const SidebarLinks: React.FC<{ cargo: string }> = ({ cargo }) => {
  const pathname = usePathname()

  return (
    <ul className="menu p-4 w-80 min-h-full text-base-content">
      {pathname.startsWith("/admin") ? (
        <>
          <li>
            <Link href="/admin/questoes">Questões</Link>
          </li>
          <li>
            <Link href="/home">Home</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/questoes/1">Questões</Link>
          </li>
          <li>
            <Link href="/desempenho">Desempenho</Link>
          </li>
          {cargo === "ADMINISTRADOR" && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}
        </>
      )}
    </ul>
  )
}

export default SidebarLinks
