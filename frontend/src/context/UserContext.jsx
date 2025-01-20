import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({ books: [], bgColor: 'rgb(15, 23, 42)' })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
