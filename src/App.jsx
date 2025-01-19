import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Settings from './components/Settings'
import { useEffect, useState } from 'react'
function App() {
  const [bgColor, setBgColor] = useState('rgb(15, 23, 42)')
  const [books, setBooks] = useState([
    {
      title: 'book one',
      author: 'author one',
    },
    {
      title: 'book two',
      author: 'author two',
    },
  ])

  useEffect(() => {
    // load bg + books from cookie
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
        <Route path='/' element={<Home books={books} />} />
        <Route
          path='/settings'
          element={
            <Settings
              books={books}
              setBooks={setBooks}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App

