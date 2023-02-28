import { useSession } from 'next-auth/react'

export default function useUser() {
  const { data, status } = useSession()
  const user = data?.user ?? null
  return { user, status }
}
