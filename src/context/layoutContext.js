import { FOLDERS_API_URL, SUBFOLDERS_API_URL } from '@/services/foldersAPI'
import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()

export default function LayoutContextProvider({ folder, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const urlFolderContext = folder
    ? `${SUBFOLDERS_API_URL}/${folder.id}`
    : FOLDERS_API_URL
  console.log({ urlFolderContext })
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)

  return (
    <LayoutContext.Provider
      value={{
        folder,
        isSidebarOpen,
        urlFolderContext,
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
