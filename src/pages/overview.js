import { Button, Layout } from '@/components'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'

export default function Overview() {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        signOut()
      }}
    >
      Logout
    </Button>
  )
}

Overview.getLayout = function getLayout({ props, page }) {
  return <Layout {...props}>{page}</Layout>
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
