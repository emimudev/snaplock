import Layout from '@/components/layout'
import { getServerUser } from '@/utils'
import { signOut } from 'next-auth/react'

export default function Dashboard({ user }) {
  return (
    <Layout user={user}>
      <div>
        <a
          href={'/api/auth/signout'}
          className="rounded bg-blue-500 p-2 text-white"
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Sign out
        </a>
      </div>
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
