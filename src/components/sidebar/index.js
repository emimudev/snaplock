import { useLayoutContext } from '@/context/layoutContext'
import services from '@/services'
import { fileSizeReadable, FILE_MEASURES } from '@/utils-browser'
import { AiOutlineCloud } from 'react-icons/ai'
import useSWR from 'swr'
import { BrandHorizontal } from '../icons'
import NavigationMenu from '../navigation-menu'

const fetcher = (url) => services.images.getStorage()

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useLayoutContext()
  const { data: storage } = useSWR('/api/storage', fetcher)

  const sidebarOpen = isSidebarOpen ? 'translate-x-0' : '-translate-x-[256px]'

  console.log({
    storage,
    max: FILE_MEASURES.MAX_STORAGE,
    '%': `${
      storage ? (storage?.storageSize / FILE_MEASURES.MAX_STORAGE) * 100 : 0
    }%`
  })

  return (
    <div className={'relative top-[56px] flex lg:top-0'}>
      <aside
        className={`absolute left-0 z-30 flex h-[calc(100vh-56px)] w-[256px] flex-1 flex-col lg:fixed lg:h-screen ${sidebarOpen} transform-gpu overflow-y-auto border-r border-[rgba(24,24,27,.1)] bg-zinc-100 pb-2 transition-transform ease-in-out dark:bg-zinc-800 lg:max-w-[256px] lg:translate-x-0 dark:lg:border-white/10 lg:dark:bg-zinc-900`}
      >
        <div className="hidden min-h-[56px] items-center justify-between px-4 lg:flex lg:px-5">
          <BrandHorizontal className="w-[140px]" />
        </div>
        <div className=" overflow-y-auto px-3 pt-3 lg:px-5">
          <NavigationMenu />
        </div>
        <hr className="my-3 dark:border-white/10" />
        <div className="flex flex-col gap-2 px-3 text-sm lg:px-5">
          <div className="flex items-center gap-3">
            <AiOutlineCloud className="h-6 w-6" />
            Storage
          </div>
          <div>
            <div className="relative h-2 rounded-full bg-slate-400/60">
              <div
                className="absolute left-0 top-0 h-2 rounded-full bg-green-500"
                style={{
                  width: `${
                    storage
                      ? (storage?.storageSize / FILE_MEASURES.MAX_STORAGE) * 100
                      : 0
                  }%`
                }}
              />
            </div>
          </div>
          <span className="text-xs">
            {storage ? fileSizeReadable(storage?.storageSize) : 'Loading...'}
            {' / '}
            {fileSizeReadable(FILE_MEASURES.MAX_STORAGE)}
          </span>
        </div>
      </aside>
      <div
        onClick={toggleSidebar}
        className={`absolute z-[29] h-screen w-screen bg-gray-600 bg-gradient-to-bl dark:bg-zinc-900/90 lg:hidden ${
          isSidebarOpen ? 'flex opacity-50' : 'hidden'
        } `}
      />
    </div>
  )
}
