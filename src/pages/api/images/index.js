import { createImages, getImages } from '@/api-utils/images'
import dbConnect from '@/lib/dbConnnect'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  const { method } = req
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ success: false })
  }
  const { user } = session

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { folderId } = req.query
        const images = await getImages({
          owner: user.id,
          isDeleted: false,
          folder: folderId || null
        })
        res.status(200).json(images)
      } catch (error) {
        console.log({ error })
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const uploadInfo = req.body
        if (!uploadInfo) {
          return res.status(400).json({ success: false })
        }
        const { folder, images } = uploadInfo
        const imageFilesToAdd = images.map((image) => ({
          file: image,
          folder,
          owner: user.id,
          uploadBy: user.id,
          privacy: {
            typeAccess: 'private',
            members: folder ? [user.id, ...folder?.privacy?.members] : [user.id]
          }
        }))
        const result = createImages({ images: imageFilesToAdd })
        res.status(201).json(result)
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
