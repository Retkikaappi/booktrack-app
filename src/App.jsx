import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {
  const books = [
    {
      title: 'book one',
      author: 'author one',
    },
    {
      title: 'book two',
      author: 'author two',
    },
  ]

  return (
    <div className='bg-gray-800'>
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
      </Routes>
    </div>
  )
}

export default App

