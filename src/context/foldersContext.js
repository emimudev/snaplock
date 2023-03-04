import { createContext, useContext, useEffect, useState } from 'react'

const FoldersContext = createContext()

export default function FoldersContextProvider({ children }) {
  const [activeFolder, setActiveFolder] = useState(null)

  useEffect(() => {
    function removeActiveFolder(evt) {
      const { target } = evt
      const canDisable = Boolean(
        target.closest('[candisablefolder="true"]') &&
          !target.closest('[candisablefolder="false"]')
      )
      if (canDisable) {
        setActiveFolder(null)
      }
    }
    window.addEventListener('click', removeActiveFolder)
    return () => {
      window.removeEventListener('click', removeActiveFolder)
    }
  }, [])

  return (
    <FoldersContext.Provider value={{ activeFolder, setActiveFolder }}>
      {children}
    </FoldersContext.Provider>
  )
}

export function useFoldersContext() {
  const context = useContext(FoldersContext)
  if (!context) {
    throw new Error(
      'useFoldersContext must be used within a FoldersContextProvider'
    )
  }
  return context
}
