import { getFolders } from '@/api-utils/folders'
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
        const folders = await getFolders({
          owner: user.id,
          isDeleted: true,
          parentFolders: { $size: 1 }
        })
        res.status(200).json(folders)
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
