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
  const { folder, rootDir } = useLayoutContext()
  const URL_KEY = `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`
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
        maxSize={FILE_MEASURES.MB * 10}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button rounded size="auto" {...props} className="h-7 px-4 text-xs">
              {children || 'Upload images'}
            </Button>
          </div>
        )}
      </Dropzone>
    </>
  )
}
