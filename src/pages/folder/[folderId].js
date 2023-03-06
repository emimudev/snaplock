import { getAndUpdateFolder } from '@/api-utils/folders'
import { Layout, PageFolders } from '@/components'
import AddFolderButton from '@/components/add-folder-button'
import FilesContextProvider from '@/context/filesContext'
import { useMainPageContext } from '@/context/mainPageContext'
import dbConnect from '@/lib/dbConnnect'

export default function FolderPage() {
  const { isItemViewerVisible } = useMainPageContext()

  return (
    <FilesContextProvider>
      <div
        candisableitem="true"
        className={`flex ${!isItemViewerVisible && 'lg:pr-[62px]'}`}
      >
        <div className="flex flex-auto flex-col px-3.5 py-5">
          <section className=" ">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold">Folders</span>
              <AddFolderButton
                size="auto"
                className="h-8"
                onlyIcon={false}
                ghost={false}
                flat
              >
                New folder
              </AddFolderButton>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-4 gap-y-3">
              <PageFolders />
            </div>
          </section>
        </div>
      </div>
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