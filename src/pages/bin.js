import { Layout, PageFolders } from '@/components'
import FolderFiles from '@/components/folder-files'
import PageEmpty from '@/components/PageEmpty'
import FilesContextProvider from '@/context/filesContext'
import { useMainPageContext } from '@/context/mainPageContext'

export default function BinPage() {
  const { isItemViewerVisible } = useMainPageContext()

  return (
    <FilesContextProvider>
      <div
        candisableitem="true"
        className={`flex ${!isItemViewerVisible && 'lg:pr-[62px]'}`}
      >
        <div className="flex flex-auto flex-col gap-9 px-4 py-5 lg:px-8">
          <PageEmpty />
          <PageFolders />
          <FolderFiles />
        </div>
      </div>
    </FilesContextProvider>
  )
}

BinPage.getLayout = function getLayout({ page, props }) {
  return (
    <Layout rootDir="bin" mainBarProps={{ title: 'Recycle bin' }} {...props}>
      {page}
    </Layout>
  )
}
