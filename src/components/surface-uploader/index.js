import { useLayoutContext } from '@/context/layoutContext'
import useUser from '@/hooks/useUser'
import services from '@/services'
import { IMAGES_API_URL } from '@/services/imagesAPI'
import { FILE_MEASURES } from '@/utils-browser'
import { useDropzone } from 'react-dropzone'
import { toast, Toaster } from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'

const fetcher = (url, { arg: { folder, images, userId } }) => {
  return services.images.createImages({ folder, images, userId })
}

export default function SurfaceUploader({ children }) {
  const { folder, rootDir } = useLayoutContext()
  const { user } = useUser()
  const URL_KEY = `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`
  const { trigger } = useSWRMutation(URL_KEY, fetcher)
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: { 'image/*': [] },
    maxSize: FILE_MEASURES.MB * 10,

    onDropAccepted: (acceptedFiles) => {
      toast.promise(
        trigger({ folder, images: acceptedFiles, userId: user.id })
          .then((info) => {})
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
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`min-h-full ${isDragAccept && 'bg-green-50'}`}
    >
      <Toaster position="bottom-right" />
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
