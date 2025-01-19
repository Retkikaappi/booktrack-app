import { useEffect, useRef, useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'

const Settings = ({ bgColor, setBgColor, books, setBooks }) => {
  const [title, setTitle] = useState('')
  const [color, setColor] = useColor(bgColor)
  const colorTimeout = useRef(null)

  useEffect(() => {
    if (colorTimeout.current) {
      clearTimeout(colorTimeout.current)
    }

    colorTimeout.current = setTimeout(() => {
      setBgColor(
        `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
      )
    }, 1000)

    return () => clearTimeout(colorTimeout.current)
  }, [color])

  const handleSearch = (value) => {
    setTitle(value)
    if (value.length >= 7) {
      console.log('start searching openlib api')
    }
  }

  const saveSettings = () => {
    console.log('saving', bgColor, books)
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
        <button className='btn p-1' onClick={saveSettings}>
          Save settings and books as a cookie
        </button>
      </div>

      <div className='p-4 mx-20'>
        <label>
          Book title{' '}
          <input
            className='p-1 rounded-md text-black'
            type='text'
            onChange={({ target }) => handleSearch(target.value)}
            value={title}
          />
        </label>
        <button className='btn p-1 mx-1'>Search</button>
        <p className='mt-4'>Current books:</p>
        <ul className='mt-2'>
          {books &&
            books.map((e) => (
              <li key={e.tilte}>
                {e.title} - {e.author}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Settings
