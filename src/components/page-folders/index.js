import { useFilesContext } from '@/context/filesContext'
import Folder from '../folder'

export default function PageFolders() {
  const { folders, foldersLoading } = useFilesContext()

  if (foldersLoading) return <Skeleton />

  return (
    <>
      {folders?.map((folder) => (
        <Folder key={folder.id} {...folder} />
      ))}
    </>
  )
}

function Skeleton() {
  return (
    <>
      {new Array(10).fill(0).map((_, index) => (
        <Folder.Skeleton key={index} />
      ))}
    </>
  )
}
