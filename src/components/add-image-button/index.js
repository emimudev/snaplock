import { useLayoutContext } from '@/context/layoutContext'
import useUser from '@/hooks/useUser'
import services from '@/services'
import { IMAGES_API_URL } from '@/services/imagesAPI'
import { FILE_MEASURES } from '@/utils-browser'
import Dropzone from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'
import Button from '../button'

const fetcher = (url, { arg: { folder, images, userId } }) => {
  return services.images.createImages({ folder, images, userId })
}

export default function AddImageButton({ children, ...props }) {
  const { user } = useUser()
  const { folder, rootDir, storagePercentage, storage } = useLayoutContext()
  const URL_KEY = `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`
  const storageSize = storage?.storageSize
  const diffSize = FILE_MEASURES.MAX_STORAGE - storageSize
  const maxSize =
    diffSize > FILE_MEASURES.MB * 10 ? FILE_MEASURES.MB * 10 : diffSize
  const { trigger } = useSWRMutation(URL_KEY, fetcher)
  const { mutate } = useSWRConfig()

  const onDropAccepted = (acceptedFiles) => {
    toast.promise(
      trigger({ folder, images: acceptedFiles, userId: user.id })
        .then((info) => {
          mutate('/api/storage')
        })
        .catch((error) => console.log({ error })),
      {
        loading: 'Uploading images...',
        success: 'Uploaded successfully',
        error:
          'Something went wrong. Remember that you can only upload 10MB per image'
      },
      { position: 'top-center' }
    )
  }

  return (
    <>
      <Dropzone
        onDropAccepted={onDropAccepted}
        noDrag
        accept={{ 'image/*': [] }}
        maxSize={maxSize}
        disabled={storagePercentage >= 100}
        onDropRejected={(rejectedFiles) => {
          if (maxSize === diffSize) {
            toast.error(
              <div className="flex flex-col justify-start text-sm">
                <span className="flex-0 ml-1">
                  There is not enough space in your storage to upload this
                  images:
                </span>
                <div className="mt-1 flex gap-1 overflow-hidden">
                  {rejectedFiles.map(({ file }) => (
                    <div
                      key={file.path}
                      className="rounded-full bg-zinc-100 p-1 dark:bg-zinc-600"
                    >
                      <span className="flex-0 ml-1 max-w-[100px] text-xs line-clamp-1 ">
                        {file.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>,
              {
                position: 'bottom-center',
                className: 'dark:bg-zinc-700/60 dark:text-white'
              }
            )
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button
              rounded
              size="auto"
              {...props}
              className="h-7 px-4 text-xs"
              disabled={storagePercentage >= 100}
            >
              {children || 'Upload images'}
            </Button>
          </div>
        )}
      </Dropzone>
    </>
  )
}
