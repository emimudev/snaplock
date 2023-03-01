import { Layout } from '@/components'

export default function FavoritesPage() {
  return <h1>Favoritos</h1>
}

FavoritesPage.getLayout = function getLayout({ page, props }) {
  return <Layout {...props}>{page}</Layout>
}

// export async function getServerSideProps({ req, res }) {
//   return {
//     props: {
//       session: await getServerSession(req, res, authOptions)
//     }
//   }
// }
