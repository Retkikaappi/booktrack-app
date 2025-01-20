import { createContext, useContext, useState } from 'react'

const LibraryContext = createContext()

export const LibraryContextProvider = (props) => {
  const [library, setLibrary] = useState([])

  return (
    <LibraryContext.Provider value={{ library, setLibrary }}>
      {props.children}
    </LibraryContext.Provider>
  )
}

export const useLibrary = () => useContext(LibraryContext)
