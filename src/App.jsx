import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Settings from './components/Settings'
import Books from './components/Books'
import Book from './components/Book'
import { useEffect } from 'react'
import { useUser } from './context/UserContext'
import Cookies from 'js-cookie'

function App() {
  const {
    setUser,
    user: { books, bgColor },
  } = useUser()

  useEffect(() => {
    const prefs = Cookies.get('userPreferences')
    if (prefs) {
      const { bgColor, books } = JSON.parse(prefs)
      setUser({
        bgColor,
        books,
      })
      console.log(bgColor, books)
    }
  }, [])

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className='bg-gradient-to-r from-slate-800 to-slate-700 flex flex-row justify-end px-4 py-1'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'isActive link' : 'link')}
        >
          Home
        </NavLink>
        <NavLink
          to='/settings'
          className={({ isActive }) => (isActive ? 'isActive link' : 'link')}
        >
          Settings
        </NavLink>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/:index' element={<Book />} />
      </Routes>
    </div>
  )
}

export default App

