import { useLayoutContext } from '@/context/layoutContext'
import { useMainPageContext } from '@/context/mainPageContext'
import services from '@/services'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { HiOutlineStar } from 'react-icons/hi'
import { ImSpinner } from 'react-icons/im'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import {
  RiDeleteBin7Line,
  RiFolderFill,
  RiInformationLine
} from 'react-icons/ri'
import { RxShare1 } from 'react-icons/rx'
import useSWRMutation from 'swr/mutation'
import ContextMenu from '../context-menu'

const fetcher = (url, { arg: folder }) => services.folders.deleteFolder(folder)

function useFolder(folder) {
  const { urlFolderContext } = useLayoutContext()
  const { id } = folder
  const { activeItem, setActiveItem, showItemViewer } = useMainPageContext()
  const router = useRouter()
  const {
    trigger,
    isMutating: loadingDelete,
    error: deleteError
  } = useSWRMutation(urlFolderContext, fetcher)
  const isActive = activeItem?.item?.id === id

  const handleFolderClick = (e) => {
    switch (e.detail) {
      case 1:
        setActiveItem({ item: folder, type: 'folder' })
        break
      case 2:
        router.push(`/folder/${id}`).finally(() => setActiveItem(null))
        break
    }
  }

  const onOpenMenuContext = () => {
    setActiveItem({ item: folder, type: 'folder' })
  }

  const removeFolder = () => {
    toast.promise(
      trigger(folder)
        .then(() => {
          setActiveItem(null)
        })
        .catch((err) => {
          console.log(err)
        }),
      {
        loading: 'Moving folder to trash bin...',
        success: 'Folder has been moved to trash bin',
        error: 'Error deleting folder'
      },
      { position: 'top-center' }
    )
  }

  const viewDetails = () => {
    showItemViewer()
  }

  return {
    isActive,
    loadingDelete,
    deleteError,
    setActiveItem,
    handleFolderClick,
    onOpenMenuContext,
    viewDetails,
    removeFolder
  }
}

export default function Folder(folder) {
  const {
    isActive,
    handleFolderClick,
    onOpenMenuContext,
    removeFolder,
    viewDetails,
    loadingDelete
  } = useFolder(folder)
  const { name } = folder

  const contextMenuItems = getContextMenuItems({
    folder,
    onRemove: removeFolder,
    onInfo: viewDetails
  })

  return (
    <ContextMenu onOpen={onOpenMenuContext} items={contextMenuItems}>
      <div
        candisableitem="false"
        onClick={handleFolderClick}
        className={`group flex h-14 select-none gap-2 overflow-hidden rounded-lg border shadow-md ${
          isActive
            ? 'border-emerald-300/40 bg-emerald-100/30 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-200/80'
            : 'hover:border-zinc-300 hover:bg-zinc-100/50 dark:border-white/10 dark:hover:bg-zinc-400/10'
        }`}
      >
        <div className="flex flex-[0_0_50px] items-center justify-center ">
          <RiFolderFill
            className={`h-6 w-6 text-slate-400/40 ${
              isActive && 'text-emerald-700/30 dark:text-emerald-200/80'
            }`}
          />
        </div>
        <div className="flex flex-auto items-center justify-between">
          <span
            className={`flex-auto text-[13px] leading-[16px] line-clamp-1 ${
              isActive && 'font-semibold'
            }`}
          >
            {name}
          </span>
          {loadingDelete && (
            <div className="flex-0 flex items-center justify-center">
              <ImSpinner className=" mx-2 h-5 w-5 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </ContextMenu>
  )
}

Folder.Skeleton = function FolderSkeleton() {
  return (
    <div className="flex h-12 animate-pulse rounded-lg border-2 bg-zinc-200/40 dark:border-white/10 dark:bg-zinc-400/10" />
  )
}

const getContextMenuItems = ({
  folder,
  onInfo,
  onRemove,
  onShare,
  onAddToStarred
}) => {
  return [
    {
      id: `${folder.id}-info`,
      onClick: onInfo,
      label: 'View details',
      icon: <RiInformationLine className="h-4 w-4" />
    },
    {
      id: `${folder.id}-share`,
      onClick: () => {},
      label: 'Share',
      icon: <RxShare1 className="h-4 w-4" />
    },
    {
      id: `${folder.id}-star`,
      onClick: () => {},
      icon: <HiOutlineStar className="h-4 w-4" />,
      label: 'Add to starred'
    },
    {
      id: `${folder.id}-rename`,
      onClick: () => {},
      icon: <MdDriveFileRenameOutline className="h-4 w-4" />,
      label: 'Rename'
    },
    {
      id: `${folder.id}-remove`,
      onClick: onRemove,
      divider: true,
      icon: <RiDeleteBin7Line className="h-4 w-4" />,
      isDanger: true,
      label: 'Remove'
    }
  ]
}
