import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { BsFiles } from 'react-icons/bs'
import { HiOutlineStar } from 'react-icons/hi'
import {
  RiBubbleChartLine,
  RiDashboardLine,
  RiDeleteBin7Line
} from 'react-icons/ri'
import { tv } from 'tailwind-variants'

const NavigationContext = createContext()

export default function NavigationMenu() {
  return (
    <NavigationContextProvider routes={routes}>
      <nav>
        <ul className="flex flex-col gap-1 overflow-x-hidden text-sm">
          {routes.map((route) => (
            <NavItem key={route.name} to={route.path} icon={route.icon}>
              {route.name}
            </NavItem>
          ))}
        </ul>
      </nav>
    </NavigationContextProvider>
  )
}

const routes = [
  {
    name: 'Overview',
    icon: RiDashboardLine,
    path: '/overview'
  },
  {
    name: 'Files',
    icon: BsFiles,
    path: '/files'
  },
  {
    name: 'Shared',
    icon: RiBubbleChartLine,
    path: '/shared'
  },
  {
    name: 'Starred',
    icon: HiOutlineStar,
    path: '/favorites'
  },
  {
    name: 'Recycle Bin',
    icon: RiDeleteBin7Line,
    path: '/bin'
  }
]

function NavigationContextProvider({ children, routes }) {
  const { pathname } = useRouter()
  const [urlMatched, setUrlMatched] = useState(
    () => routes.find((route) => route.path === pathname)?.path || null
  )
  console.log({ urlMatched, pathname })
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
  // const { pathname } = useRouter()
  // console.log({ pathname, to, match: pathname === to })
  // const matchRoute = pathname === to
  const { isMatched, setUrlMatched } = useContext(NavigationContext)
  const matchRoute = isMatched({ path: to })
  const Icon = icon
  return (
    <li
      onClick={() => setUrlMatched(to)}
      className={NavItemStyles({ active: matchRoute })}
    >
      <Link
        className="flex h-full w-full items-center gap-2 px-3 py-2"
        href={to}
      >
        {icon && (
          <span>
            <Icon className="h-4 w-4" />
          </span>
        )}
        <div>{children}</div>
      </Link>
    </li>
  )
}
