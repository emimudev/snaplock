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
        const folders = await FolderModel.find({ owner: user.id })
        res.status(200).json(folders)
      } catch (error) {
        console.log({ error })
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const folderToAdd = req.body
        folderToAdd.owner = session.user.id
        folderToAdd.description = folderToAdd.description || ''
        folderToAdd.created = {
          whoCreated: session.user.id
        }
        folderToAdd.opened = {
          date: null,
          whoOpened: null
        }
        const folder = await FolderModel.create(folderToAdd)
        res.status(201).json(folder)
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
