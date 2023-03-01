import { Avatar } from '@/components'
import { useLayoutContext } from '@/context/layoutContext'
import { memo } from 'react'
import { TiThMenu } from 'react-icons/ti'
import { BrandHorizontal } from '../icons'
import ToggleTheme from '../toggle-theme'
import UserPopover from '../user-popover'

function Navbar({ user }) {
  const { toggleSidebar } = useLayoutContext()
  return (
    <div className="relative flex h-[56px] w-full items-center justify-between gap-2  border-b border-[rgba(24,24,27,.1)] px-4 dark:border-white/10 md:px-8">
      <div className="flex items-center gap-5 lg:flex">
        <button
          className="flex flex-[0_0_auto] lg:hidden"
          onClick={toggleSidebar}
        >
          <TiThMenu className="h-5 w-5 text-inherit" />
        </button>
        <BrandHorizontal className="w-[140px] flex-[0_0_auto] lg:hidden" />
      </div>
      <div>
        <input placeholder="search" />
      </div>
      <div className="flex gap-2">
        <ToggleTheme />
        <div>
          <UserPopover>
            <Avatar
              // imageProps={{ priority: true }}
              src={user?.image}
              alt={user?.name}
            />
          </UserPopover>
        </div>
      </div>
    </div>
  )
}

export default memo(Navbar)
