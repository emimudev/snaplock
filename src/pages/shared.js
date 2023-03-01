import { Layout } from '@/components'

export default function SharedPage() {
  return <h1>Compartidos</h1>
}

SharedPage.getLayout = function getLayout({ page, props }) {
  return <Layout {...props}>{page}</Layout>
}

// SharedPage.getInitialProps = async ({ req, res }) => {
//   return {
//     session: await getServerSession(req, res, authOptions)
//   }
// }

// export async function getServerSideProps({ req, res }) {
//   console.log('here')
//   return {
//     props: {
//       session: await getServerSession(req, res, authOptions)
//     }
//   }
// }
