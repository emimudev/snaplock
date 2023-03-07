import { Layout, PageFolders } from '@/components'
import AddFolderButton from '@/components/add-folder-button'
import FolderFiles from '@/components/folder-files'
import SurfaceUploader from '@/components/surface-uploader'
import FilesContextProvider from '@/context/filesContext'
import { useMainPageContext } from '@/context/mainPageContext'

export default function FilesPage() {
  const { isItemViewerVisible } = useMainPageContext()

  return (
    <FilesContextProvider>
      <SurfaceUploader>
        <div
          candisableitem="true"
          className={`flex ${!isItemViewerVisible && 'lg:pr-[62px]'}`}
        >
          <div className="flex flex-auto flex-col gap-9 px-3.5 py-5">
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
            <section className=" ">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">Files</span>
              </div>
              <div>
                <FolderFiles />
              </div>
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

FilesPage.getLayout = function getLayout({ page, props }) {
  return (
    <Layout
      rootDir="files"
      mainBarProps={{ title: 'My files', actions: <MainActions /> }}
      {...props}
    >
      {page}
    </Layout>
  )
}
