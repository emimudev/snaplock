import { getImages } from '@/api-utils/images'
import dbConnect from '@/lib/dbConnnect'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { user } = await getServerSession(req, res, authOptions)
        const images = await getImages({
          owner: user.id,
          isForeverDeleted: false
        })
        let size = 0
        images.forEach((img) => {
          const { folder, isForeverDeleted } = img
          if (!isForeverDeleted && !folder) {
            size += img.file.bytes
          }
          if (!isForeverDeleted && folder && !folder?.isForeverDeleted) {
            size += img.file.bytes
          }
        })

        res.status(200).json({ storageSize: size, user })
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
