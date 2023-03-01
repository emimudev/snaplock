import { Button, Layout } from '@/components'
import { getServerUser } from '@/utils'
import { signOut } from 'next-auth/react'
import { ImHome } from 'react-icons/im'

export default function Overview({ user }) {
  return (
    <Layout user={user}>
      <Button
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Logout
      </Button>
      <hr />
      <Button size="xs" onlyIcon>
        <ImHome />
      </Button>
      <Button size="sm" onlyIcon>
        <ImHome />
      </Button>
      <Button size="md" onlyIcon>
        <ImHome />
      </Button>
      <Button onlyIcon rounded ghost>
        <ImHome />
      </Button>
      <Button size="lg" onlyIcon>
        <ImHome />
      </Button>
      <Button size="xl" onlyIcon>
        <ImHome />
      </Button>
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
