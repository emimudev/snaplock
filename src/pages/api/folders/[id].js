import { getFolderById } from '@/api-utils/folders'
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
      try {
        const folder = await getFolderById({ folderId: id })
        if (!folder) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(folder)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const modifiedFolder = await FolderModel.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        )
        if (!modifiedFolder) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(modifiedFolder)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const folderToDelete = await getFolderById({ folderId: id })
        folderToDelete.isDeleted = true
        await folderToDelete.save()
        // const deletedFolder = await FolderModel.deleteOne({ _id: id })
        if (!folderToDelete) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(folderToDelete)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
