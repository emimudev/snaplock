import LayoutContextProvider, {
  useLayoutContext
} from '@/context/layoutContext'
import { BrandHorizontal } from '../icons'
import Navbar from '../navbar'

export default function Layout({ children, user }) {
  return (
    <LayoutContextProvider>
      <div className="relative flex h-screen w-screen dark:bg-[#18181b]">
        <Sidebar />
        <div className="relative flex flex-1 flex-col transition-all lg:pl-[256px]">
          <header className="relative h-14 max-h-[56px] ">
            <Navbar user={user} />
          </header>
          <div className="flex h-[calc(100%-56px)] ">
            <main className="flex-auto overflow-y-auto overflow-x-hidden ">
              {children}
            </main>
            <div className="flex-0 hidden min-w-[270px] lg:flex ">
              Item viewer
            </div>
          </div>
        </div>
      </div>
    </LayoutContextProvider>
  )
}

function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useLayoutContext()

  const sidebarOpen = isSidebarOpen ? 'translate-x-0' : '-translate-x-[256px]'

  return (
    <div className={'relative top-[56px] flex lg:top-0'}>
      <aside
        className={`absolute left-0 z-[10000] flex h-screen w-[256px] flex-1 flex-col lg:fixed ${sidebarOpen} transform-gpu border-r border-[rgba(24,24,27,.1)] bg-white px-4 transition-transform dark:bg-[#18181b] lg:max-w-[256px] lg:translate-x-0 lg:px-6`}
      >
        <div className="hidden min-h-[56px] items-center justify-between lg:flex">
          <BrandHorizontal className="w-[140px]" />
        </div>
      </aside>
      <div
        onClick={toggleSidebar}
        className={`absolute z-[9999] h-screen w-screen bg-gray-600 bg-gradient-to-bl lg:hidden ${
          isSidebarOpen ? 'flex opacity-50' : 'hidden opacity-0'
        } transition-opacity duration-300`}
      />
    </div>
  )
}
