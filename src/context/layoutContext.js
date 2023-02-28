import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()

export default function LayoutContextProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)

  return (
    <LayoutContext.Provider
      value={{ isSidebarOpen, toggleSidebar, closeSidebar, openSidebar }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

/**
 * Custom hook to access the layout context
 * @typedef {Object} LayoutContext
 * @property {boolean} isSidebarOpen - Whether the sidebar is open or not
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
