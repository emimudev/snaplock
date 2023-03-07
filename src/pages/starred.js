import { Layout } from '@/components'

export default function StarredPage() {
  return <h1>Favoritos</h1>
}

StarredPage.getLayout = function getLayout({ page, props }) {
  return (
    <Layout rootDir="starred" {...props}>
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
