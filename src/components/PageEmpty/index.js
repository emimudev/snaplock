import { useFilesContext } from '@/context/filesContext'
import { EmptyFolders } from '../icons'

export default function PageEmpty({ label, icon }) {
  const { folders, files, foldersLoading, filesLoading } = useFilesContext()

  if (foldersLoading || filesLoading) return null

  if (folders.length > 0 || files.length > 0) return null

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-3.5 py-5">
      <div className="w-full max-w-[160px] text-zinc-400 dark:text-zinc-400">
        {icon || <EmptyFolders />}
      </div>
      <div className="text-center dark:text-zinc-400">
        <p className="text-lg font-semibold">No folders</p>
        <p className="text-sm text-zinc-400">
          {label || 'Create a folder or upload files to get started'}
        </p>
      </div>
    </div>
  )
}
