import { useFilesContext } from '@/context/filesContext'
import { useLayoutContext } from '@/context/layoutContext'
import AddFolderButton from '../add-folder-button'
import Folder from '../folder'

export default function PageFolders() {
  const { folders, foldersLoading, filesLoading } = useFilesContext()
  const { rootDir, folder } = useLayoutContext()

  if (foldersLoading || filesLoading) return <Skeleton />

  if (folders.length === 0) {
    return null
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <span className="">Folders</span>
        {(rootDir === 'files' || folder) && <AddFolderButton />}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-4 gap-y-3">
        {folders?.map((folder) => (
          <Folder key={folder.id} {...folder} />
        ))}
      </div>
    </section>
  )
}

function Skeleton() {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <span className="">Folders</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-4 gap-y-3">
        {new Array(4).fill(0).map((_, index) => (
          <Folder.Skeleton key={index} />
        ))}
      </div>
    </>
  )
}
