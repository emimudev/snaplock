import { getAndUpdateFolder } from '@/api-utils/folders'
import { Layout, PageFolders } from '@/components'
import AddFolderButton from '@/components/add-folder-button'
import AddImageButton from '@/components/add-image-button'
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
          <div className="flex flex-auto flex-col gap-9 px-4 py-5 lg:px-8">
            <PageEmpty />
            <PageFolders />
            <FolderFiles />
          </div>
        </div>
      </SurfaceUploader>
    </FilesContextProvider>
  )
}

function MainActions() {
  return (
    <div className="flex items-center gap-2">
      <AddImageButton />
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

  if (
    !folder ||
    folder.isDeleted ||
    folder.parentFolders.some((folder) => folder.isDeleted)
  ) {
    return {
      redirect: {
        destination: '/files',
        props: {
          deletedFolder: folder
        },
        permanent: false
      }
    }
  }

  return {
    props: {
      folder: JSON.parse(JSON.stringify(folder))
    }
  }
}
