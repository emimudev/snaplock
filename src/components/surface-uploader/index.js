import { useLayoutContext } from '@/context/layoutContext'
import useUser from '@/hooks/useUser'
import services from '@/services'
import { IMAGES_API_URL } from '@/services/imagesAPI'
import { FILE_MEASURES } from '@/utils-browser'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'

const fetcher = (url, { arg: { folder, images, userId } }) => {
  return services.images.createImages({ folder, images, userId })
}

export default function SurfaceUploader({ children }) {
  const { folder, rootDir, storagePercentage, storage } = useLayoutContext()
  const { user } = useUser()
  const URL_KEY = `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`
  const { trigger } = useSWRMutation(URL_KEY, fetcher)
  const { mutate } = useSWRConfig()
  const storageSize = storage?.storageSize
  const diffSize = FILE_MEASURES.MAX_STORAGE - storageSize
  const maxSize =
    diffSize > FILE_MEASURES.MB * 10 ? FILE_MEASURES.MB * 10 : diffSize
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    disabled: storagePercentage >= 100,
    noClick: true,
    noKeyboard: true,
    accept: { 'image/*': [] },
    maxSize,

    onDropAccepted: (acceptedFiles) => {
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
        }
      )
    },

    onDropRejected: (rejectedFiles) => {
      console.log({ rejectedFiles })
      if (maxSize === diffSize) {
        toast.error(
          <div className="flex flex-col justify-start text-sm">
            <span className="flex-0 ml-1">
              There is not enough space in your storage to upload this images:
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
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`min-h-full ${
        isDragAccept && 'bg-green-50 dark:bg-emerald-400/10'
      }`}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
