import { getImage } from '@/api-utils/images'
import dbConnect from '@/lib/dbConnnect'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      res.status(400).json({ success: false })
      break

    case 'PUT':
      res.status(400).json({ success: false })
      break

    case 'DELETE':
      try {
        const imageToDelete = await getImage({ imageId: id })
        imageToDelete.isDeleted = true
        await imageToDelete.save()
        // const deletedFolder = await FolderModel.deleteOne({ _id: id })
        if (!imageToDelete) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(imageToDelete)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
