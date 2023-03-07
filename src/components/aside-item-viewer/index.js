import { useMainPageContext } from '@/context/mainPageContext'
import { FaCommentAlt } from 'react-icons/fa'
import FolderViewer from '../folder-viewer'
import ImageViewer from './image'

export default function AsideItemViewer() {
  const { activeItem, isItemViewerVisible } = useMainPageContext()
  return (
    <div
      className={`layout-aside-item-viewer can-disable-folder flex-0 hidden max-w-[270px] transform-gpu overflow-x-hidden border-l bg-zinc-100 transition-[min-width,width] dark:border-white/10 dark:bg-zinc-900 md:block  ${
        !isItemViewerVisible ? 'w-0 min-w-0' : 'w-full min-w-[270px]'
      }`}
    >
      {!activeItem && <EmptyItem />}
      {activeItem?.type === 'folder' && <FolderViewer />}
      {activeItem?.type === 'image' && <ImageViewer />}
    </div>
  )
}

function EmptyItem() {
  return (
    <div className="flex flex-col items-center justify-center p-5 py-20 dark:text-zinc-400">
      <FaCommentAlt className="text-8xl text-zinc-300 dark:text-zinc-500" />
      <div className="mt-4 text-center ">
        Select a file or folder to see its details
      </div>
    </div>
  )
}
