import { Button, Layout } from '@/components'
import { getServerUser } from '@/utils'
import { signOut } from 'next-auth/react'

export default function Overview({ user }) {
  return (
    <Layout user={user}>
      <Button
        ghost
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Sign out
      </Button>
      <Button>Hola mundo</Button>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
  const { user } = await getServerUser(req, res)
  return {
    props: {
      user
    }
  }
}
