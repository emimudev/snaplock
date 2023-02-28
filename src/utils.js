import { getServerSession } from 'next-auth'
import { authOptions } from './pages/api/auth/[...nextauth]'

export async function getServerUser(req, res, options = authOptions) {
  const session = await getServerSession(req, res, options)
  console.log({ session })
  const user = session?.user || null
  return { user }
}
