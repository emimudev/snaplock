import { Button, Layout } from '@/components'
import { signOut } from 'next-auth/react'

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

// export async function getServerSideProps({ req, res }) {
//   return {
//     props: {
//       session: await getServerSession(req, res, authOptions)
//     }
//   }
// }
