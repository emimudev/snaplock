import services from '@/services'
import { IMAGES_API_URL } from '@/services/imagesAPI'
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { useLayoutContext } from './layoutContext'

const fetcherFolders = () => services.folders.getFolders()
const fetcherSubFolders = ({ parentFolderId }) => {
  return () => services.folders.getSubFolders({ parentFolderId })
}
const fetcherDeltedFolders = () => services.folders.getDeletedFolders()

const fetcherFiles = ({ folder }) => {
  return async () => services.images.getImages({ folderId: folder?.id })
}
const fetcherDeletedFiles = () => services.images.getDeletedImages()

const FilesContext = createContext()

export default function FilesContextProvider({ children }) {
  const { urlFolderContext, folder, rootDir } = useLayoutContext()

  const filesFetchers = {
    files: fetcherFiles({ folder }),
    bin: fetcherDeletedFiles
  }

  const foldersFetchers = {
    files: fetcherFolders,
    bin: fetcherDeltedFolders
  }

  const {
    data: folders,
    error: foldersError,
    isLoading: foldersLoading
  } = useSWR(
    urlFolderContext,
    folder
      ? fetcherSubFolders({ parentFolderId: folder.id })
      : foldersFetchers[rootDir]
  )

  const {
    data: files,
    isLoading: filesLoading,
    error: errorFiles
  } = useSWR(
    `${IMAGES_API_URL}/${folder ? folder.id : rootDir}`,
    folder ? fetcherFiles({ folder }) : filesFetchers[rootDir]
  )

  return (
    <FilesContext.Provider
      value={{
        folders,
        foldersError,
        foldersLoading,
        files,
        filesLoading,
        errorFiles
      }}
    >
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
