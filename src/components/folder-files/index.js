import { useFilesContext } from '@/context/filesContext'
import { useMainPageContext } from '@/context/mainPageContext'
import { CLOUD_NAME } from '@/services/imagesAPI'
import Image from 'next/image'

export default function FolderFiles() {
  const { filesLoading, foldersLoading, files } = useFilesContext()

  if (filesLoading || foldersLoading) {
    return (
      <>
        <div className="mb-3 flex items-center justify-between">
          <span className="">Files</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-4 gap-y-3 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
          {new Array(3).fill(0).map((_, index) => (
            <ImageFileSkeleton key={index} />
          ))}
        </div>
      </>
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
  const { setActiveItem, activeItem } = useMainPageContext()
  const isActive = activeItem && activeItem.item.id === image.id
  const { file } = image
  const { public_id: publicId, original_filename: originalFilename } = file

  const handleClick = () => {
    setActiveItem({ item: image, type: 'image' })
  }

  console.log({ isActive, activeItem })

  return (
    <div
      candisableitem="false"
      onClick={handleClick}
      className={`overflow-hidden rounded-2xl border-2 border-zinc-200 transition-transform dark:border-white/10 ${
        isActive && 'ring-[2px] ring-emerald-500 dark:bg-emerald-700'
      }`}
    >
      <div className="group flex w-full flex-col gap-2  ">
        <div
          className={`relative overflow-hidden bg-zinc-200 transition-colors before:block before:w-full before:pt-[56.25%] dark:bg-white/20 ${
            isActive && 'bg-emerald-400 dark:bg-emerald-600'
          }`}
        >
          <Image
            priority={priority}
            className={`pointer-events-none absolute top-0 h-full w-full object-cover transition-opacity ${
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
  )
}

function ImageFileSkeleton() {
  return (
    <div className="group flex w-full flex-col gap-2 overflow-hidden rounded-2xl">
      <div className="relative animate-pulse overflow-hidden rounded-2xl border-2 bg-zinc-200/40 before:block before:w-full before:pt-[56.25%] dark:border-white/10 dark:bg-zinc-400/10" />
    </div>
  )
}
