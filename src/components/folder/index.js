import { useFoldersContext } from '@/context/foldersContext'
import { RiFolderFill } from 'react-icons/ri'

export default function Folder({
  id,
  name,
  type,
  privacy,
  location,
  opened,
  created,
  edited
}) {
  const { activeFolder, setActiveFolder } = useFoldersContext()
  const isActive = activeFolder === id
  return (
    <div
      candisablefolder="false"
      onClick={() => setActiveFolder(id)}
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

export const FolderModel = {
  name: 'Folder 1',
  id: '1',
  type: 'folder',
  privacy: {
    type: 'public',
    members: [
      { id: '1', name: 'User 1', image: '' },
      { id: '2', name: 'User 2', image: '' }
    ]
  },
  location: 'root',
  opened: {
    date: '2021-01-01',
    whoOpened: { id: '1', name: 'User 1', image: '' }
  },
  created: {
    date: '2021-01-01',
    whoCreated: { id: '1', name: 'User 1', image: '' }
  },
  edited: {
    date: '2021-01-01',
    whoEdited: { id: '1', name: 'User 1', image: '' }
  },
  children: [
    /* List of folders */
  ]
}
