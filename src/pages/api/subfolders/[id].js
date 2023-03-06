import { getFolderById, getFolders } from '@/api-utils/folders'
import dbConnect from '@/lib/dbConnnect'
import FolderModel from '@/models/FolderModel'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

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
        const { user } = session
        const folder = await getFolders({
          parentFolder: id,
          owner: user.id,
          isDeleted: false
        })
        if (!folder) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(folder)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const parentFolder = await getFolderById({ folderId: id })
        const folderToAdd = req.body
        const folderModel = new FolderModel(folderToAdd)
        folderModel.name = folderToAdd.name
        folderModel.owner = parentFolder.owner._id
        folderModel.parentFolder = parentFolder._id
        folderModel.whoCreated = session.user.id
        folderModel.parentFolders = [
          ...parentFolder.parentFolders,
          parentFolder._id
        ]
        folderModel.privacy.members = [session.user.id]
        folderModel.hierarchyLevel = parentFolder.hierarchyLevel + 1
        console.log({ parentFolder, folderModel })
        const folderSaved = await folderModel.save()
        res.status(200).json({ folderSaved })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
