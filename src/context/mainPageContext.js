import { createContext, useContext, useState } from 'react'

const MainPageContext = createContext()

export default function MainPageContextProvider({ children }) {
  const [isItemViewerVisible, setIsItemViewerVisible] = useState(true)
  const toggleItemViewer = () => setIsItemViewerVisible((prev) => !prev)

  return (
    <MainPageContext.Provider
      value={{
        isItemViewerVisible,
        toggleItemViewer
      }}
    >
      {children}
    </MainPageContext.Provider>
  )
}

/**
 * @typedef {Object} MainPageContext - The main page context
 * @property {boolean} isItemViewerVisible - Wheter the item viewer is visible or not
 * @property {() => void} toggleItemViewer - Toggles the item viewer visibility
 */
/**
 * Reads the main page context
 * @see {@link MainPageContextProvider}
 * @returns {MainPageContext}
 */
export function useMainPageContext() {
  const context = useContext(MainPageContext)
  if (!context) {
    throw new Error(
      'useMainPageContext must be used within a MainPageContextProvider'
    )
  }
  return context
}
