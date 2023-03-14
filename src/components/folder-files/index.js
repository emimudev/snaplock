import { useFilesContext } from '@/context/filesContext'
import { useLayoutContext } from '@/context/layoutContext'
import { useMainPageContext } from '@/context/mainPageContext'
import services from '@/services'
import { CLOUD_NAME, IMAGES_API_URL } from '@/services/imagesAPI'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { HiOutlineStar } from 'react-icons/hi'
import { MdRestore } from 'react-icons/md'
import { RiDeleteBin7Line, RiInformationLine } from 'react-icons/ri'
import { RxShare1 } from 'react-icons/rx'
import { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'
import ContextMenu from '../context-menu'

const fetcher = (url, { arg: image }) => services.images.deleteImage(image)
const fetcherRestore = (url, { arg: image }) => {
  return services.images.restoreImage(image)
}
const fetcherRemoveForever = (url, { arg: image }) => {
  return services.images.removeForever(image)
}

function useFile(image) {
  const { folder, rootDir } = useLayoutContext()
  const { id } = image
  const { activeItem, setActiveItem, showItemViewer } = useMainPageContext()
  const { mutate } = useSWRConfig()
  const {
    trigger,
    isMutating: loadingDelete,
    error: deleteError
  } = useSWRMutation(
    `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`,
    fetcher
  )
  const isActive = activeItem?.item?.id === id

  const { trigger: triggerRestore } = useSWRMutation(
    `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`,
    fetcherRestore
  )

  const { trigger: deleteForever } = useSWRMutation(
    `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`,
    fetcherRemoveForever
  )

  const restoreImage = () => {
    toast.promise(
      triggerRestore({ ...image, isDeleted: false })
        .then(() => {
          setActiveItem(null)
        })
        .catch((err) => {
          console.log(err)
        }),
      {
        loading: 'Restoring image...',
        success: 'Image has been restored',
        error: 'Error restoring folder'
      },
      { position: 'top-center' }
    )
  }

  const onOpenMenuContext = () => {
    setActiveItem({ item: image, type: 'image' })
  }

  const removeImage = () => {
    toast.promise(
      trigger(image)
        .then(() => {
          setActiveItem(null)
        })
        .catch((err) => {
          console.log(err)
        }),
      {
        loading: 'Moving image to trash bin...',
        success: 'Image has been moved to trash bin',
        error: 'Error deleting image'
      },
      { position: 'top-center' }
    )
  }

  const removeForever = () => {
    toast.promise(
      deleteForever(image)
        .then(() => {
          setActiveItem(null)
          mutate('/api/storage')
        })
        .catch((err) => {
          console.log(err)
        }),
      {
        loading: 'Deleting image...',
        success: 'Image has been deleted',
        error: 'Error deleting image'
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
    globalFolder: folder,
    rootDir,
    deleteError,
    setActiveItem,
    onOpenMenuContext,
    viewDetails,
    removeImage,
    restoreImage,
    removeForever
  }
}

export default function FolderFiles() {
  const { filesLoading, foldersLoading, files } = useFilesContext()

  if (filesLoading || foldersLoading) {
    return (
      <section>
        <div className="mb-3 flex items-center justify-between">
          <span className="">Files</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-4 gap-y-3 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
          {new Array(3).fill(0).map((_, index) => (
            <ImageFileSkeleton key={index} />
          ))}
        </div>
      </section>
    )
  }

  if (files?.length === 0) {
    return null
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <span className="">Files</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-4 gap-y-3 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
        {files?.map((image, index) => (
          <ImageFile priority={index <= 8} key={image.id} image={image} />
        ))}
      </div>
    </section>
  )
}

function ImageFile({ image, priority }) {
  const {
    isActive,
    onOpenMenuContext,
    removeImage,
    globalFolder,
    rootDir,
    viewDetails,
    restoreImage,
    removeForever
  } = useFile(image)
  const { setActiveItem, showImageViewer } = useMainPageContext()
  const { file } = image
  const { public_id: publicId, original_filename: originalFilename } = file

  const handleClick = (e) => {
    switch (e.detail) {
      case 1:
        {
          const isMobile = window.matchMedia(
            'only screen and (max-width: 767px)'
          ).matches
          setActiveItem({ item: image, type: 'image' })
          isMobile && showImageViewer()
        }
        break
      case 2:
        showImageViewer()
        break
    }
  }

  return (
    <ContextMenu
      onOpen={onOpenMenuContext}
      items={getContextMenuItems({
        file,
        onRemove: removeImage,
        onRestore: restoreImage,
        onRemovePermanently: removeForever,
        globalFolder,
        rootDir,
        onInfo: viewDetails
      })}
    >
      <div
        candisableitem="false"
        onClick={handleClick}
        className={`overflow-hidden rounded-2xl border-2 border-zinc-200 transition-transform dark:border-white/10 ${
          isActive && 'ring-[2px] ring-emerald-500 dark:bg-emerald-700'
        }`}
      >
        <div className="group flex w-full select-none flex-col gap-2">
          <div
            className={`relative overflow-hidden bg-zinc-200 transition-colors before:block before:w-full before:pt-[56.25%] dark:bg-white/20 ${
              isActive && 'bg-emerald-400 dark:bg-emerald-600'
            }`}
          >
            <Image
              priority={priority}
              className={`pointer-events-none absolute top-0 h-full w-full select-none object-cover transition-opacity ${
                isActive ? 'opacity-80' : 'group-hover:opacity-80'
              }`}
              src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_650/${publicId}.webp`}
              width={450}
              height={170}
              alt={'original_filename'}
            />
            <div
              className={
                'absolute bottom-0 left-0 right-0 z-10 flex h-9 items-center bg-black/50 px-4 text-xs text-white backdrop-blur-sm '
              }
            >
              <span className="line-clamp-1">{originalFilename}</span>
            </div>
          </div>
        </div>
      </div>
    </ContextMenu>
  )
}

function ImageFileSkeleton() {
  return (
    <div className="group flex w-full flex-col gap-2 overflow-hidden rounded-2xl">
      <div className="relative animate-pulse overflow-hidden rounded-2xl border-2 bg-zinc-200/40 before:block before:w-full before:pt-[56.25%] dark:border-white/10 dark:bg-zinc-400/10" />
    </div>
  )
}

const getContextMenuItems = ({
  globalFolder,
  rootDir,
  file,
  onInfo,
  onRemove,
  onRestore,
  onRemovePermanently,
  onShare,
  onAddToStarred
}) => {
  if (globalFolder || rootDir === 'files') {
    return [
      {
        id: `${file.id}-info`,
        onClick: onInfo,
        label: 'View details',
        icon: <RiInformationLine className="h-4 w-4" />
      },
      {
        id: `${file.id}-share`,
        onClick: onShare,
        label: 'Share',
        icon: <RxShare1 className="h-4 w-4" />
      },
      {
        id: `${file.id}-star`,
        onClick: onAddToStarred,
        icon: <HiOutlineStar className="h-4 w-4" />,
        label: 'Add to starred'
      },
      // {
      //   id: `${file.id}-rename`,
      //   onClick: () => {},
      //   icon: <MdDriveFileRenameOutline className="h-4 w-4" />,
      //   label: 'Rename'
      // },
      {
        id: `${file.id}-remove`,
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
        id: `${file.id}-info`,
        onClick: onInfo,
        label: 'View details',
        icon: <RiInformationLine className="h-4 w-4" />
      },
      {
        id: `${file.id}-restore`,
        onClick: onRestore,
        icon: <MdRestore className="h-4 w-4" />,
        label: 'Restore'
      },
      {
        id: `${file.id}-remove`,
        onClick: onRemovePermanently,
        divider: true,
        icon: <RiDeleteBin7Line className="h-4 w-4" />,
        isDanger: true,
        label: 'Remove forever'
      }
    ]
  }

  if (rootDir === 'starred') {
    return [
      {
        id: `${file.id}-info`,
        onClick: onInfo,
        label: 'View details',
        icon: <RiInformationLine className="h-4 w-4" />
      },
      {
        id: `${file.id}-share`,
        onClick: onShare,
        label: 'Share',
        icon: <RxShare1 className="h-4 w-4" />
      },
      {
        id: `${file.id}-remove-starred`,
        onClick: onRestore,
        icon: <MdRestore className="h-4 w-4" />,
        label: 'Remove from starred'
      },
      {
        id: `${file.id}-remove`,
        onClick: onRemove,
        divider: true,
        icon: <RiDeleteBin7Line className="h-4 w-4" />,
        isDanger: true,
        label: 'Remove'
      }
    ]
  }

  return [
    {
      id: `${file.id}-info`,
      onClick: onInfo,
      label: 'View details',
      icon: <RiInformationLine className="h-4 w-4" />
    }
  ]
}
