import { useLayoutContext } from '@/context/layoutContext'
import { BrandHorizontal } from '../icons'
import NavigationMenu from '../navigation-menu'

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useLayoutContext()

  const sidebarOpen = isSidebarOpen ? 'translate-x-0' : '-translate-x-[256px]'

  return (
    <div className={'relative top-[56px] flex lg:top-0'}>
      <aside
        className={`absolute left-0 z-[10000] flex h-[calc(100vh-56px)] w-[256px] flex-1 flex-col lg:fixed lg:h-screen ${sidebarOpen} transform-gpu overflow-y-auto border-r border-[rgba(24,24,27,.1)] bg-white pb-2 transition-transform ease-in-out dark:bg-[#18181b]  lg:max-w-[256px] lg:translate-x-0 dark:lg:border-white/10`}
      >
        <div className="hidden min-h-[56px] items-center justify-between px-4 lg:flex lg:px-5">
          <BrandHorizontal className="w-[140px]" />
        </div>
        <div className=" overflow-y-auto px-4 pt-3  lg:px-5">
          <NavigationMenu />
        </div>
        {/* <hr /> */}
        {/* Almacenamiento */}
      </aside>
      <div
        onClick={toggleSidebar}
        className={`absolute z-[9999] h-screen w-screen bg-gray-600 bg-gradient-to-bl lg:hidden ${
          isSidebarOpen ? 'flex opacity-50' : 'hidden'
        } `}
      />
    </div>
  )
}
