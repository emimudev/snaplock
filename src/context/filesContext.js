import services from '@/services'
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { useLayoutContext } from './layoutContext'

const fetcher = () => services.folders.getFolders()
const fetcherSubFolders = ({ parentFolderId }) => {
  return () => services.folders.getSubFolders({ parentFolderId })
}

const FilesContext = createContext()

export default function FilesContextProvider({ children }) {
  const { urlFolderContext, folder } = useLayoutContext()
  console.log({ inside: urlFolderContext })
  const {
    data: folders,
    error: foldersError,
    isLoading: foldersLoading
  } = useSWR(
    urlFolderContext,
    folder ? fetcherSubFolders({ parentFolderId: folder.id }) : fetcher
  )

  return (
    <FilesContext.Provider value={{ folders, foldersError, foldersLoading }}>
      {children}
    </FilesContext.Provider>
  )
}

export function useFilesContext() {
  const context = useContext(FilesContext)
  if (!context) {
    throw new Error(
      'useFilesContext must be used within a FilesContextProvider'
    )
  }
  return context
}
