import useUser from '@/hooks/useUser'
import { Popover } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { RiSettings3Line } from 'react-icons/ri'
import { usePopper } from 'react-popper'
import Avatar from '../avatar'
import Button from '../button'

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
    <Popover className="relative">
      <Popover.Button
        ref={setReferenceElement}
        className="rounded-full focus-within:outline-none focus:outline-none"
      >
        {children}
      </Popover.Button>

      <Popover.Panel
        className="absolute z-10 w-full max-w-[370px] rounded-2xl bg-slate-100 p-1.5 shadow-lg dark:bg-zinc-800"
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
              <li className="flex ">
                <Link
                  className="flex h-full w-full gap-4 px-3 py-3.5 hover:bg-emerald-50 dark:hover:bg-emerald-700/20"
                  href="/settings"
                >
                  {<RiSettings3Line className="h-5 w-5" />}
                  Settings
                </Link>
              </li>
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

export default UserPopover
