import dbConnect from '@/lib/dbConnnect'
import FolderModel from '@/models/FolderModel'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      break

    case 'PUT':
      // try {
      //   const pet = await Pet.findByIdAndUpdate(id, req.body, {
      //     new: true,
      //     runValidators: true,
      //   })
      //   if (!pet) {
      //     return res.status(400).json({ success: false })
      //   }
      //   res.status(200).json({ success: true, data: pet })
      // } catch (error) {
      //   res.status(400).json({ success: false })
      // }
      break

    case 'DELETE':
      try {
        const deletedFolder = await FolderModel.deleteOne({ _id: id })
        if (!deletedFolder) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(deletedFolder)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
