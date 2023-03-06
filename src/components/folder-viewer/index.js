import { useMainPageContext } from '@/context/mainPageContext'
import { BiWorld } from 'react-icons/bi'
import { RiFolderFill, RiFolderLockFill } from 'react-icons/ri'
import Avatar from '../avatar'
import Button from '../button'

export default function FolderViewer() {
  const { activeItem } = useMainPageContext()
  if (activeItem && activeItem?.type !== 'folder') return null
  const { item: folder } = activeItem

  return (
    <div className="z-2 relative flex flex-col  overflow-x-hidden text-zinc-800 dark:text-zinc-300">
      <div className="sticky top-0 flex gap-2 border-b border-zinc-300 bg-zinc-100 p-5 dark:border-white/10 dark:bg-zinc-900">
        {/* <RiFolderFill className="flex-0 text-2xl " /> */}
        <h2 className="flex-1 font-semibold line-clamp-2">{folder.name}</h2>
      </div>
      <div className="flex flex-col border-b border-zinc-300 p-5  dark:border-white/10">
        <div className="mb-6 flex items-center justify-center">
          <RiFolderFill className="flex-0 text-8xl text-zinc-400 dark:text-zinc-300" />
        </div>
        <div className="mb-2">Who has access</div>
        {folder.privacy.typeAccess === 'public' ? (
          <TextGhost className="flex items-center gap-2 text-sm">
            <BiWorld className="h-5 w-5" />
            Everyone with the link
          </TextGhost>
        ) : (
          <TextGhost className="flex items-center text-sm">
            {folder.privacy.members.length === 1 ? (
              <div className="flex items-center gap-2 text-sm">
                <RiFolderLockFill className="h-5 w-5" />
                Only me
              </div>
            ) : (
              <div className="flex">
                {folder.privacy.members.slice(0, 6).map((user, index) => (
                  <Avatar
                    src={user.image}
                    key={user.id}
                    size="sm"
                    className={`relative border-2 ${index > 0 && '-ml-3'}`}
                  />
                ))}
                {folder.privacy.members.length > 6 && (
                  <div className="ml-2 flex items-center gap-2 text-sm">
                    {folder.privacy.members.length | 6} more
                  </div>
                )}
              </div>
            )}
          </TextGhost>
        )}
        <div className="mt-5 flex ">
          <Button bordered size="sm" color="secondary">
            Manage access
          </Button>
        </div>
      </div>
      <div className="flex flex-col p-5">
        <div className="mb-4 font-semibold">Folder details</div>
        <div className="mb-2 ">Owner</div>
        <TextGhost className="flex items-center gap-2 text-sm">
          <Avatar src={folder.owner.image} {...folder.owner} size="sm" />
          {folder.owner.name}
        </TextGhost>
        <div className="mt-6 mb-2 ">Created</div>
        <TextGhost className="flex items-center gap-2 text-sm">
          {folder.dateCreated}
        </TextGhost>
        <div className="mt-6 mb-2 ">Opened</div>
        <TextGhost className="flex items-center gap-2 text-sm">
          {folder.dateOpened || 'Never'}
        </TextGhost>
        {folder.parentFolder && (
          <>
            <div className="mt-6 mb-2 ">Parent Folder</div>
            <TextGhost className="flex items-center gap-2 text-sm">
              <Button
                as="span"
                flat
                size="sm"
                rounded
                className="active:scale-1 bg-white shadow-sm hover:bg-white dark:bg-white/10"
              >
                {folder.parentFolder?.name}
              </Button>
            </TextGhost>
          </>
        )}
      </div>
    </div>
  )
}

function TextGhost({ className, children }) {
  return (
    <div className={`text-zinc-500 dark:text-zinc-300 ${className}`}>
      {children}
    </div>
  )
}
