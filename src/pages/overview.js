import { Layout } from '@/components'

export default function Overview() {
  return <h1>Overview</h1>
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
