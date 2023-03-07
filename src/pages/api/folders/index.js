import { getFolders } from '@/api-utils/folders'
import dbConnect from '@/lib/dbConnnect'
import FolderModel from '@/models/FolderModel'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const { method } = req
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ success: false })
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { user } = session
        const folders = await getFolders({
          owner: user.id,
          parentFolder: null,
          isDeleted: false,
          isForeverDeleted: false
        })
        res.status(200).json(folders)
      } catch (error) {
        console.log({ error })
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const folderToAdd = req.body
        const folderModel = new FolderModel(folderToAdd)
        folderModel.owner = session.user.id
        folderModel.description = folderToAdd.description || ''
        folderModel.whoCreated = session.user.id
        const folderAdded = await folderModel.save()
        res.status(201).json(folderAdded)
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
