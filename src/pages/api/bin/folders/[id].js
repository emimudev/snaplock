import { removeFolder } from '@/api-utils/folders'
import dbConnect from '@/lib/dbConnnect'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(req, res) {
  const { method } = req
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ success: false })
  }

  await dbConnect()

  switch (method) {
    case 'DELETE':
      try {
        const { id } = req.query
        const folder = await removeFolder({ id })
        if (!folder) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(folder)
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
