import { Avatar, Button } from '@/components'
import { useLayoutContext } from '@/context/layoutContext'
import { memo } from 'react'
import { TiThMenu } from 'react-icons/ti'
import { BrandHorizontal } from '../icons'
import UserPopover from '../user-popover'

function Navbar({ user }) {
  const { toggleSidebar } = useLayoutContext()
  return (
    <div className="relative flex h-[56px] w-full items-center justify-between gap-2 border-b border-[rgba(24,24,27,.1)] px-4 dark:border-white/10">
      <div className="flex items-center gap-2 lg:flex">
        <Button
          flat
          onlyIcon
          size="sm"
          className="flex flex-[0_0_auto] lg:hidden"
          onClick={toggleSidebar}
        >
          <TiThMenu className="h-5 w-5 text-inherit" />
        </Button>
        <BrandHorizontal className="hidden w-[140px] flex-[0_0_auto] sm:block lg:hidden" />
      </div>
      <div></div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <UserPopover>
            <Avatar src={user?.image} alt={user?.name} />
          </UserPopover>
        </div>
      </div>
    </div>
  )
}

export default memo(Navbar)
