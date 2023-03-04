import { useTheme } from '@/context/theme-context'
import useUser from '@/hooks/useUser'
import { Popover } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { MdOutlineDarkMode } from 'react-icons/md'
import { RiSettings3Line } from 'react-icons/ri'
import { usePopper } from 'react-popper'
import Avatar from '../avatar'
import Button from '../button'
import ToggleTheme from '../toggle-theme'

// PONER EL DARK MODE EN EL POPUP

function UserPopover({ children }) {
  const { user } = useUser()
  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }]
  })

  return (
    <Popover className="relative flex">
      <Popover.Button
        ref={setReferenceElement}
        className="rounded-full focus-within:outline-none focus:outline-none"
      >
        {children}
      </Popover.Button>

      <Popover.Panel
        className="absolute z-10 mb-3 max-h-[calc(100vh-66px)] w-full max-w-[370px] overflow-y-auto rounded-2xl bg-slate-100 p-1.5 shadow-lg dark:bg-zinc-800"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="flex flex-col overflow-x-hidden rounded-2xl bg-white pt-4 dark:bg-zinc-700/50">
          <div className="flex items-center gap-4 px-3">
            <Avatar.Logged size="xl" />
            <div className="flex flex-col">
              <span className="font-semibold">{user?.name}</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {user?.email}
              </span>
            </div>
          </div>
          <hr className="border-3 mt-4 border-slate-100 dark:border-zinc-600" />
          <div className="text-sm">
            <ul className="flex flex-col">
              <UserPopoverItem icon={RiSettings3Line} to="/settings">
                Settings
              </UserPopoverItem>
              <ChangeThemeItem />
            </ul>
          </div>
        </div>
        <div className="py-2">
          <Button onClick={signOut} ghost color="danger" className="w-full">
            Logout
          </Button>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

function UserPopoverItem({ icon, to, children }) {
  const Icon = icon
  return (
    <li className="flex ">
      <Link
        href={to}
        className="flex h-full w-full gap-4 px-3 py-3.5 hover:bg-emerald-50 dark:hover:bg-emerald-700/20"
      >
        <Icon className="h-5 w-5" />
        {children}
      </Link>
    </li>
  )
}

function ChangeThemeItem() {
  const { toggleTheme } = useTheme()

  return (
    <li onClick={toggleTheme} className="group flex cursor-pointer">
      <div className="flex h-full w-full items-center gap-4 px-3 py-3.5 hover:bg-emerald-50 dark:hover:bg-emerald-700/20">
        <MdOutlineDarkMode className="h-5 w-5" />
        <div className="flex w-full items-center justify-between">
          <span>Dark theme</span>
          <ToggleTheme />
        </div>
      </div>
    </li>
  )
}

export default UserPopover
