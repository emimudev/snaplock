import { SIDEBAR_ROUTES } from '@/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { tv } from 'tailwind-variants'

export default function NavigationMenu() {
  return (
    <nav>
      <ul className="flex flex-col gap-1 overflow-x-hidden p-1 text-sm">
        {SIDEBAR_ROUTES.map((route) => (
          <NavItem
            key={route.name}
            soon={route.soon}
            to={route.path}
            icon={route.icon}
          >
            {route.name}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

const NavItemStyles = tv({
  base: 'relative flex rounded-md hover:bg-white/80 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-400/10 dark:text-zinc-200 dark:hover:bg-white/5',
  variants: {
    active: {
      true: 'font-semibold bg-emerald-200/40 border-zinc-200 dark:border-zinc-400/10 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-400 dark:hover:bg-emerald-400/30'
    }
  }
})

function NavItem({ icon, soon, children, to }) {
  const router = useRouter()
  const matchRoute = to === router.pathname
  const Icon = icon
  return (
    <li className={NavItemStyles({ active: matchRoute })}>
      <Link
        className="flex h-full w-full items-center justify-between px-3 py-2"
        href={soon ? '#' : to}
      >
        <div className="flex items-center gap-3 ">
          {icon && (
            <span>
              <Icon className="h-[18px] w-[18px]" />
            </span>
          )}
          <div>{children}</div>
        </div>
        {soon && (
          <span className="absolute right-1 flex items-center gap-1 rounded-full border p-[2px] px-2 text-xs dark:border-white/30 dark:text-white/40">
            <span>Soon</span>
          </span>
        )}
      </Link>
    </li>
  )
}
