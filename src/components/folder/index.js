import { useMainPageContext } from '@/context/mainPageContext'
import { RiFolderFill } from 'react-icons/ri'

export default function Folder(folder) {
  const { id, name } = folder
  const { activeItem, setActiveItem } = useMainPageContext()
  const isActive = activeItem?.item?.id === id

  return (
    <div
      candisableitem="false"
      onClick={() => setActiveItem({ item: folder, type: 'folder' })}
      className={`group flex h-14 select-none gap-4 overflow-hidden rounded-lg border-2  ${
        isActive
          ? 'border-emerald-300/40 bg-emerald-100/30 text-emerald-500'
          : 'hover:border-zinc-300 hover:bg-zinc-200/40'
      }`}
    >
      <div className="flex flex-[0_0_50px] items-center justify-center ">
        <RiFolderFill
          className={`h-5 w-5 text-zinc-600/60 ${
            isActive && 'text-emerald-700/50'
          }`}
        />
      </div>
      <div className="flex flex-auto items-center ">
        <span className="text-[13px] leading-[13px] line-clamp-1">{name}</span>
      </div>
    </div>
  )
}

Folder.Skeleton = function FolderSkeleton() {
  return (
    <div className="flex h-12 animate-pulse rounded-lg border-2 bg-zinc-200/40" />
  )
}
