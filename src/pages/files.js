import { Layout } from '@/components'

export default function FilesPage() {
  return <h1>Mis archivos</h1>
}

FilesPage.getLayout = function getLayout({ page, props }) {
  return <Layout {...props}>{page}</Layout>
}
