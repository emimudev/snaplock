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
      // try {
      //   const { id } = req.query
      //   const folder = await removeFolder({ id })
      //   if (!folder) {
      //     return res.status(400).json({ success: false })
      //   }
      //   res.status(200).json(folder)
      // } catch (error) {
      //   console.log({ error })
      //   res.status(400).json({ success: false })
      // }
      // break
      try {
        const folderToDelete = await FolderModel.findById(id)
        if (!folderToDelete) {
          return res.status(404).json({ success: false })
        }
        const result = await FolderModel.deleteMany({
          $or: [{ _id: id }, { parentFolders: { $in: [id] } }]
        })
        res.status(200).json({
          folder: folderToDelete,
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
