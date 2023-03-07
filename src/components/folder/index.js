import { useLayoutContext } from '@/context/layoutContext'
import { useMainPageContext } from '@/context/mainPageContext'
import services from '@/services'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { HiOutlineStar } from 'react-icons/hi'
import { ImSpinner } from 'react-icons/im'
import { MdDriveFileRenameOutline, MdRestore } from 'react-icons/md'
import {
  RiDeleteBin7Line,
  RiFolderFill,
  RiInformationLine
} from 'react-icons/ri'
import { RxShare1 } from 'react-icons/rx'
import useSWRMutation from 'swr/mutation'
import ContextMenu from '../context-menu'

const fetcher = (url, { arg: folder }) => services.folders.deleteFolder(folder)
const fetcherRestore = (url, { arg: folder }) => {
  return services.folders.restoreFolder(folder)
}
const fetcherRemoveForever = (url, { arg: folder }) => {
  return services.folders.removeForever(folder)
}

function useFolder(folder) {
  const { urlFolderContext, folder: globalFolder, rootDir } = useLayoutContext()
  const { id } = folder
  const { activeItem, setActiveItem, showItemViewer } = useMainPageContext()
  const router = useRouter()
  const {
    trigger,
    isMutating: loadingDelete,
    error: deleteError
  } = useSWRMutation(urlFolderContext, fetcher)

  const { trigger: triggerRestore } = useSWRMutation(
    urlFolderContext,
    fetcherRestore
  )

  const { trigger: deleteForever } = useSWRMutation(
    urlFolderContext,
    fetcherRemoveForever
  )

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

  const restoreFolder = () => {
    toast.promise(
      triggerRestore({ ...folder, isDeleted: false })
        .then(() => {
          setActiveItem(null)
        })
        .catch((err) => {
          console.log(err)
        }),
      {
        loading: 'Restoring folder...',
        success: 'Folder has been restored',
        error: 'Error restoring folder'
      },
      { position: 'top-center' }
    )
  }

  const removeForever = () => {
    toast.promise(
      deleteForever(folder)
        .then(() => {
          setActiveItem(null)
        })
        .catch((err) => {
          console.log(err)
        }),
      {
        loading: 'Deleting folder...',
        success: 'Folder has been deleted',
        error: 'Error deleting folder'
      },
      { position: 'top-center' }
    )
  }

  return {
    isActive,
    loadingDelete,
    deleteError,
    globalFolder,
    rootDir,
    setActiveItem,
    handleFolderClick,
    onOpenMenuContext,
    removeForever,
    viewDetails,
    removeFolder,
    restoreFolder
  }
}

export default function Folder(folder) {
  const {
    isActive,
    handleFolderClick,
    onOpenMenuContext,
    removeFolder,
    viewDetails,
    restoreFolder,
    removeForever,
    loadingDelete,
    globalFolder,
    rootDir
  } = useFolder(folder)
  const { name } = folder

  const contextMenuItems = getContextMenuItems({
    globalFolder,
    rootDir,
    folder,
    onRemove: removeFolder,
    onInfo: viewDetails,
    onRestore: restoreFolder,
    onRemovePermanently: removeForever
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
  globalFolder,
  rootDir,
  folder,
  onInfo,
  onRemove,
  onRestore,
  onRemovePermanently,
  onShare,
  onAddToStarred
}) => {
  console.log({ globalFolder, rootDir })
  if (globalFolder || rootDir === 'files') {
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

  if (rootDir === 'bin') {
    return [
      {
        id: `${folder.id}-info`,
        onClick: onInfo,
        label: 'View details',
        icon: <RiInformationLine className="h-4 w-4" />
      },
      {
        id: `${folder.id}-restore`,
        onClick: onRestore,
        icon: <MdRestore className="h-4 w-4" />,
        label: 'Restore'
      },
      {
        id: `${folder.id}-remove`,
        onClick: onRemovePermanently,
        divider: true,
        icon: <RiDeleteBin7Line className="h-4 w-4" />,
        isDanger: true,
        label: 'Remove forever'
      }
    ]
  }

  return [
    {
      id: `${folder.id}-info`,
      onClick: onInfo,
      label: 'View details',
      icon: <RiInformationLine className="h-4 w-4" />
    }
  ]
}
