import { useEffect, useRef } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import { useUser } from '../context/UserContext'

import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

const Settings = () => {
  const {
    setUser,
    user: { books, bgColor },
  } = useUser()
  const [color, setColor] = useColor(bgColor)

  const colorTimeout = useRef(null)

  useEffect(() => {
    if (colorTimeout.current) {
      clearTimeout(colorTimeout.current)
    }

    colorTimeout.current = setTimeout(() => {
      setUser({
        books,
        bgColor: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
      })
    }, 1000)

    return () => clearTimeout(colorTimeout.current)
  }, [color])

  const saveSettings = () => {
    Cookies.remove('userPreferences')
    const data = { bgColor: bgColor || 'rgb(15, 23, 42)', books: books || [] }
    Cookies.set('userPreferences', JSON.stringify(data), {
      expires: 7,
    })
    alert('data saved')
  }

  return (
    <div
      className='text-center flex flex-row justify-center p-20'
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className='w-80 p-4 mx-20'>
        <h3 className='font-bold m-2'>Change background</h3>
        <ColorPicker height={80} color={color} onChange={setColor} />
      </div>

      <div>
        <button onClick={saveSettings}>
          Save settings and books as a cookie
        </button>
        <p className='mt-4'>Current books:</p>
        <ul className='mt-2'></ul>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody className='text-start'>
            {books &&
              books.map((e) => (
                <tr key={e.title}>
                  <td>{e.title}</td> <td>{e.author_name || 'Author?'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className='p-4 mx-20'>
        <NavLink to='/books' className='btn m-1 p-1'>
          <button>Search and add books</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Settings
