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
    case 'GET':
      try {
        const folderToDelete = await FolderModel.findById(id)
        if (!folderToDelete) {
          return res.status(400).json({ success: false })
        }
        const result = await FolderModel.updateMany(
          {
            $or: [{ _id: id }, { parentFolders: { $in: [id] } }]
          },
          { isDeleted: false }
        )
        res.status(200).json({
          folderId: folderToDelete.name,
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
