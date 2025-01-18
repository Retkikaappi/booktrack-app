import { NavLink } from 'react-router-dom'

function App() {
  return (
    <div className='bg-gray-800'>
      <div className='bg-gradient-to-r from-slate-800 to-slate-700 flex flex-row-reverse px-4 py-1'>
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
      <div className='text-center'>Content here</div>
    </div>
  )
}

export default App

