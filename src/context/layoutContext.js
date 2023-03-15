import services from '@/services'
import { FOLDERS_API_URL, SUBFOLDERS_API_URL } from '@/services/foldersAPI'
import { FILE_MEASURES } from '@/utils-browser'
import { createContext, useContext, useState } from 'react'
import useSWR from 'swr'

const LayoutContext = createContext()

const foldersURL = {
  files: FOLDERS_API_URL,
  bin: `${FOLDERS_API_URL}/bin/folders`,
  starred: `${FOLDERS_API_URL}/starred/folders`,
  shared: `${FOLDERS_API_URL}/shared/folders`
}

const fetcher = (url) => services.images.getStorage()

export default function LayoutContextProvider({ folder, rootDir, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const urlFolderContext = folder
    ? `${SUBFOLDERS_API_URL}/${folder.id}`
    : foldersURL[rootDir]
  const { data: storage } = useSWR('/api/storage', fetcher)
  const storagePercentage =
    (storage?.storageSize / FILE_MEASURES.MAX_STORAGE) * 100
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)

  return (
    <LayoutContext.Provider
      value={{
        folder,
        isSidebarOpen,
        urlFolderContext,
        rootDir,
        storagePercentage,
        storage,
        toggleSidebar,
        closeSidebar,
        openSidebar
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

/**
 * Custom hook to access the layout context
 * @typedef {Object} LayoutContext
 * @property {Object} folder - The current folder
 * @property {boolean} isSidebarOpen - Whether the sidebar is open or not
 * @property {String} urlFolderContext - The url to do actions to the currentFolder
 * @property {Number} storagePercentage - The percentage of storage used
 * @property {Object} storage - The storage object
 * @property {String|undefined} rootDir - The current rootDir
 * @property {() => void} toggleSidebar - Toggle the sidebar open/closed
 * @property {() => void} closeSidebar - Close the sidebar
 * @property {() => void} openSidebar - Open the sidebar
 * @returns {LayoutContext}
 */
export function useLayoutContext() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error(
      'useLayoutContext must be used within a LayoutContextProvider'
    )
  }
  return context
}
