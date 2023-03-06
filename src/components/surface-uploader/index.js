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
  const { folder } = useLayoutContext()
  const { user } = useUser()
  const URL = folder ? `${IMAGES_API_URL}/${folder.id}` : IMAGES_API_URL
  const { trigger } = useSWRMutation(URL, fetcher)
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: { 'image/*': [] },
    maxSize: FILE_MEASURES.MB * 10,

    onDropAccepted: (acceptedFiles) => {
      toast.promise(
        trigger({ folder, images: acceptedFiles, userId: user.id })
          .then((info) => console.log({ info }))
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
