import { useMainPageContext } from '@/context/mainPageContext'
import { CLOUD_NAME } from '@/services/imagesAPI'
import Image from 'next/image'
import Modal from '../modal'

export default function ImageViewer() {
  const { activeItem, showImage, hideImageViewer } = useMainPageContext()
  console.log({ activeItem, showImage })
  return (
    <Modal isOpen={showImage} onClose={hideImageViewer} size="image">
      {activeItem && activeItem?.type === 'image' ? (
        <Image
          className="pointer-events-auto h-auto max-w-full"
          src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${activeItem?.item?.file?.public_id}.webp`}
          alt={activeItem?.item?.name}
          width={activeItem?.item?.file?.width}
          height={activeItem?.item?.file?.height}
        />
      ) : null}
    </Modal>
  )
}
