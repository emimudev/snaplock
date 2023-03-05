import services from '@/services'
import { FOLDERS_API_URL } from '@/services/foldersAPI'
import { createContext, useContext } from 'react'
import useSWR from 'swr'

const fetcher = () => services.folders.getFolders()

const FilesContext = createContext()

export default function FilesContextProvider({ children }) {
  const {
    data: folders,
    error: foldersError,
    isLoading: foldersLoading
  } = useSWR(FOLDERS_API_URL, fetcher)

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
