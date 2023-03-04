import { Layout } from '@/components'
import Folder, { FolderModel } from '@/components/folder'
import FoldersContextProvider from '@/context/foldersContext'
import { useMainPageContext } from '@/context/mainPageContext'

export default function FilesPage() {
  const { isItemViewerVisible } = useMainPageContext()

  return (
    <div
      candisablefolder="true"
      className={`flex ${!isItemViewerVisible && 'lg:pr-[62px]'}`}
    >
      <div className="flex flex-auto flex-col px-3.5 py-5">
        <section className=" ">
          <div className="mb-3 font-semibold">Folders</div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-4 gap-y-3">
            <FoldersContextProvider>
              {new Array(10)
                .fill(FolderModel)
                .map(({ id, ...folder }, index) => {
                  return <Folder key={index} id={index} {...folder} />
                })}
            </FoldersContextProvider>
          </div>
        </section>
      </div>
    </div>
  )
}

FilesPage.getLayout = function getLayout({ page, props }) {
  return (
    <Layout title="My files" {...props}>
      {page}
    </Layout>
  )
}
