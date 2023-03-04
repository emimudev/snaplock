import { ROUTES } from '@/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { tv } from 'tailwind-variants'

const NavigationContext = createContext()

export default function NavigationMenu() {
  return (
    <NavigationContextProvider routes={ROUTES}>
      <nav>
        <ul className="flex flex-col gap-1 overflow-x-hidden text-sm">
          {ROUTES.map((route) => (
            <NavItem key={route.name} to={route.path} icon={route.icon}>
              {route.name}
            </NavItem>
          ))}
        </ul>
      </nav>
    </NavigationContextProvider>
  )
}

function NavigationContextProvider({ children, routes }) {
  const { pathname } = useRouter()
  const [urlMatched, setUrlMatched] = useState(
    () => routes.find((route) => route.path === pathname)?.path || null
  )
  const isMatched = ({ path }) => path === urlMatched

  return (
    <NavigationContext.Provider
      value={{ urlMatched, setUrlMatched, isMatched }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

const NavItemStyles = tv({
  base: 'flex rounded-md hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/5',
  variants: {
    active: {
      true: 'font-semibold bg-emerald-100/70 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-400 dark:hover:bg-emerald-400/30'
    }
  }
})

function NavItem({ icon, children, to }) {
  const { isMatched, setUrlMatched } = useContext(NavigationContext)
  const matchRoute = isMatched({ path: to })
  const Icon = icon
  return (
    <li
      onClick={() => setUrlMatched(to)}
      className={NavItemStyles({ active: matchRoute })}
    >
      <Link
        className="flex h-full w-full items-center gap-3 px-3 py-2"
        href={to}
      >
        {icon && (
          <span>
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
        <div>{children}</div>
      </Link>
    </li>
  )
}
