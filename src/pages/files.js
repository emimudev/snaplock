import { Layout, UserFolders } from '@/components'
import AddFolderButton from '@/components/add-folder-button'
import FilesContextProvider from '@/context/filesContext'
import { useMainPageContext } from '@/context/mainPageContext'

export default function FilesPage() {
  const { isItemViewerVisible } = useMainPageContext()

  return (
    <FilesContextProvider>
      <div
        candisableitem="true"
        className={`flex ${!isItemViewerVisible && 'lg:pr-[62px]'}`}
      >
        <div className="flex flex-auto flex-col px-3.5 py-5">
          <section className=" ">
            <div className="mb-3 font-semibold">Folders</div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-4 gap-y-3">
              <UserFolders />
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

FilesPage.getLayout = function getLayout({ page, props }) {
  return (
    <Layout title="My files" actions={<MainActions />} {...props}>
      {page}
    </Layout>
  )
}
