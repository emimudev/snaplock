import { getImages } from '@/api-utils/images'
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
    case 'POST':
      try {
        const images = await getImages({
          owner: user.id,
          isStarred: true
        })
        res.status(200).json(images)
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
