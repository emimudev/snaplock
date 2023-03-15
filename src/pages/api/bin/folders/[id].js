import dbConnect from '@/lib/dbConnnect'
import FolderModel from '@/models/FolderModel'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ success: false })
  }

  await dbConnect()

  switch (method) {
    case 'DELETE':
      try {
        const foldersToDelete = await FolderModel.find({
          $or: [{ _id: id }, { parentFolders: { $in: [id] } }]
        })
        if (foldersToDelete.length === 0) {
          return res.status(404).json({ success: false })
        }
        const result = await Promise.all(
          foldersToDelete.map((folder) => folder.deleteOne())
        )
        res.status(200).json({
          foldersToDelete: foldersToDelete.map((folder) => folder.name),
          result
        })
      } catch (error) {
        console.log({ error })
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
