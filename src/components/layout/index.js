import { Navbar, Sidebar } from '@/components'
import LayoutContextProvider from '@/context/layoutContext'
import MainPageContextProvider from '@/context/mainPageContext'
import useUser from '@/hooks/useUser'
import AsideItemViewer from '../aside-item-viewer'
import MainBarPage from '../main-bar-page'

export default function Layout({
  folder,
  showMainBar = true,
  children,
  mainBarProps
}) {
  const { user } = useUser()
  return (
    <LayoutContextProvider folder={folder}>
      <div className="relative flex h-screen w-screen dark:bg-zinc-800">
        <Sidebar />
        <div className="relative flex flex-1 flex-col transition-all lg:pl-[256px]">
          <header className="relative h-14 max-h-[56px] ">
            <Navbar user={user} />
          </header>
          <div className="flex h-[calc(100%-56px)] flex-col">
            <MainPageContextProvider>
              {showMainBar && <MainBarPage {...mainBarProps} />}
              <main className="layout-main-content flex flex-auto overflow-x-hidden ">
                <div
                  candisableitem="true"
                  className="flex-auto overflow-y-auto"
                >
                  {children}
                </div>
                {showMainBar && <AsideItemViewer />}
              </main>
            </MainPageContextProvider>
          </div>
        </div>
      </div>
    </LayoutContextProvider>
  )
}
