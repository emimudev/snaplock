import { Navbar, Sidebar } from '@/components'
import LayoutContextProvider from '@/context/layoutContext'

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
