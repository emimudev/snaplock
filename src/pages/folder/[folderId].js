import { getAndUpdateFolder } from '@/api-utils/folders'
import { Layout, PageFolders } from '@/components'
import AddFolderButton from '@/components/add-folder-button'
import FolderFiles from '@/components/folder-files'
import PageEmpty from '@/components/PageEmpty'
import SurfaceUploader from '@/components/surface-uploader'
import FilesContextProvider from '@/context/filesContext'
import { useMainPageContext } from '@/context/mainPageContext'
import dbConnect from '@/lib/dbConnnect'

export default function FolderPage() {
  const { isItemViewerVisible } = useMainPageContext()

  return (
    <FilesContextProvider>
      <SurfaceUploader>
        <div
          candisableitem="true"
          className={`flex ${!isItemViewerVisible && 'lg:pr-[62px]'}`}
        >
          <div className="flex flex-auto flex-col gap-9 px-3.5 py-5">
            <PageEmpty />
            <section className=" ">
              <PageFolders />
            </section>
            <section className=" ">
              <FolderFiles />
            </section>
          </div>
        </div>
      </SurfaceUploader>
    </FilesContextProvider>
  )
}

function MainActions() {
  return (
    <div className="flex items-center gap-2">
      <AddFolderButton />
    </div>
  )
}

FolderPage.getLayout = function getLayout({ page, props }) {
  const { folder } = props
  return (
    <Layout
      folder={folder}
      mainBarProps={{ actions: <MainActions /> }}
      {...props}
    >
      {page}
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { folderId } = context.params
  await dbConnect()
  const folder = await getAndUpdateFolder(
    { _id: folderId },
    { dateOpened: Date.now() }
  )
  return {
    props: {
      folder: JSON.parse(JSON.stringify(folder))
    }
  }
}
