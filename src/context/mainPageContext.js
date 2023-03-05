import { createContext, useContext, useEffect, useState } from 'react'

const MainPageContext = createContext()

export default function MainPageContextProvider({ children }) {
  const [isItemViewerVisible, setIsItemViewerVisible] = useState(true)
  const [activeItem, setActiveItem] = useState(null)
  const toggleItemViewer = () => setIsItemViewerVisible((prev) => !prev)
  const showItemViewer = () => setIsItemViewerVisible(true)

  useEffect(() => {
    function removeActiveFolder(evt) {
      const { target } = evt
      const canDisable = Boolean(
        target.closest('[candisableitem="true"]') &&
          !target.closest('[candisableitem="false"]')
      )
      if (canDisable) {
        setActiveItem(null)
      }
    }
    window.addEventListener('click', removeActiveFolder)
    return () => {
      window.removeEventListener('click', removeActiveFolder)
    }
  }, [])

  return (
    <MainPageContext.Provider
      value={{
        activeItem,
        setActiveItem,
        isItemViewerVisible,
        toggleItemViewer,
        showItemViewer
      }}
    >
      {children}
    </MainPageContext.Provider>
  )
}

/**
 * @typedef {Object} MainPageContext - The main page context
 * @property {boolean} isItemViewerVisible - Wheter the item viewer is visible or not
 * @property {{type:'folder'|'file', item: Object}} activeItem - The active item to show in the item viewer
 * @property {() => void} setActiveItem - Sets the active item to show in the item viewer
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
