import { Avatar } from '@/components'
import { useLayoutContext } from '@/context/layoutContext'
import { memo } from 'react'
import { TiThMenu } from 'react-icons/ti'
import { BrandHorizontal } from '../icons'
import ToggleTheme from '../toggle-theme'

function Navbar({ user }) {
  const { toggleSidebar } = useLayoutContext()
  return (
    <div className="relative flex h-[56px] w-full items-center justify-between gap-2 overflow-hidden border-b border-[rgba(24,24,27,.1)] px-4 dark:border-white/10 md:px-8">
      <div className="flex items-center gap-5 lg:flex">
        <button
          className="flex flex-[0_0_auto] lg:hidden"
          onClick={toggleSidebar}
        >
          <TiThMenu className="h-5 w-5 text-inherit" />
        </button>
        <BrandHorizontal className="w-[140px] flex-[0_0_auto] lg:hidden" />
      </div>
      <div></div>
      <div className="flex gap-2">
        <ToggleTheme />
        {user && (
          <div>
            <Avatar src={user?.image} alt={user?.name} />
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Navbar)
