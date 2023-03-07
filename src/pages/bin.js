import { Layout } from '@/components'

export default function BinPage() {
  return <h1>Papelera</h1>
}

BinPage.getLayout = function getLayout({ page, props }) {
  return (
    <Layout rootDir="bin" {...props}>
      {page}
    </Layout>
  )
}

// export async function getServerSideProps({ req, res }) {
//   return {
//     props: {
//       session: await getServerSession(req, res, authOptions)
//     }
//   }
// }
