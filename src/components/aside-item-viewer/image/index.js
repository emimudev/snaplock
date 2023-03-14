import Avatar from '@/components/avatar'
import Button from '@/components/button'
import { useMainPageContext } from '@/context/mainPageContext'
import { CLOUD_NAME } from '@/services/imagesAPI'
import { fileSizeReadable } from '@/utils-browser'
import Image from 'next/image'
import { BiWorld } from 'react-icons/bi'
import { RiFolderLockFill } from 'react-icons/ri'

export default function ImageViewer() {
  const { activeItem, showImageViewer } = useMainPageContext()
  if (activeItem && activeItem?.type !== 'image') return null
  const { item: image } = activeItem
  const { file } = image
  const { original_filename: originalFilename, public_id: publicId } = file

  return (
    <div className="z-2 relative flex flex-col  overflow-x-hidden text-zinc-800 dark:text-zinc-300">
      <div className="sticky top-0 flex gap-2 border-b border-zinc-300 bg-zinc-100 p-5 dark:border-white/10 dark:bg-zinc-900">
        {/* <RiFolderFill className="flex-0 text-2xl " /> */}
        <h2 className="flex-1 font-semibold line-clamp-2">
          {originalFilename}
        </h2>
      </div>
      <div className="flex flex-col border-b border-zinc-300 p-5  dark:border-white/10">
        <div
          className="mb-6 flex cursor-pointer items-center justify-center"
          onClick={showImageViewer}
        >
          <Image
            priority
            className={'h-full w-full object-cover'}
            src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_650/${publicId}.webp`}
            width={450}
            height={170}
            alt={originalFilename}
          />
        </div>
        <div className="mb-2">Who has access</div>
        {image.privacy.typeAccess === 'public' ? (
          <TextGhost className="flex items-center gap-2 text-sm">
            <BiWorld className="h-5 w-5" />
            Everyone with the link
          </TextGhost>
        ) : (
          <TextGhost className="flex items-center text-sm">
            {image.privacy.members.length === 1 ? (
              <div className="flex items-center gap-2 text-sm">
                <RiFolderLockFill className="h-5 w-5" />
                Only me
              </div>
            ) : (
              <div className="flex">
                {image.privacy.members.slice(0, 6).map((user, index) => (
                  <Avatar
                    src={user.image}
                    key={user.id}
                    size="sm"
                    className={`relative border-2 ${index > 0 && '-ml-3'}`}
                  />
                ))}
                {image.privacy.members.length > 6 && (
                  <div className="ml-2 flex items-center gap-2 text-sm">
                    {image.privacy.members.length | 6} more
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
        <div className="mb-4 font-semibold">File details</div>
        <div className="mb-2 ">Owner</div>
        <TextGhost className="flex items-center gap-2 text-sm">
          <Avatar src={image.owner.image} {...image.owner} size="sm" />
          {image.owner.name}
        </TextGhost>
        <div className="mt-6 mb-2 ">Created</div>
        <TextGhost className="flex items-center gap-2 text-sm">
          {image.uploadDate}
        </TextGhost>
        <div className="mt-6 mb-2 ">Size</div>
        <TextGhost className="flex items-center gap-2 text-sm">
          {fileSizeReadable(image.file.bytes, false, 2)}
        </TextGhost>
        {image.folder && (
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
                {image.folder?.name}
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
