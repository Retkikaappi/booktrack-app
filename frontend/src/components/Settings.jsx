import { useEffect, useRef, useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import { openLibSearch } from '../requests/book'

const Settings = ({ bgColor, setBgColor, books, setBooks }) => {
  const [title, setTitle] = useState('')
  const [color, setColor] = useColor(bgColor)
  const [libraryBooks, setLibraryBooks] = useState([])
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

  const handleSearch = async () => {
    console.log(title)
    if (title.length >= 7) {
      console.log('start searching openlib api')
      const resp = await openLibSearch(title)
      setLibraryBooks(resp.docs)
      setTitle('')
      console.log(resp)
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
        <p className='mt-4'>Current books:</p>
        <ul className='mt-2'>
          {books &&
            books.map((e) => (
              <li key={e.title}>
                {e.title} - {e.author}
              </li>
            ))}
        </ul>
      </div>

      <div className='p-4 mx-20'>
        <label>
          Book title{' '}
          <input
            className='p-1 rounded-md text-black'
            type='text'
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </label>
        <button className='btn p-1 mx-1' onClick={handleSearch}>
          Search
        </button>
        <p className='mt-4'>Search results:</p>
        <ul className='mt-2'>
          {libraryBooks &&
            libraryBooks.map((book) => (
              <li key={book.key} className='p-2 border-2'>
                <span className='font-bold'>{book.title}</span> by:{' '}
                {book.author_name} - {book.number_of_pages_median} -{' '}
                {book.first_publish_year}
                <button className='btn mx-2 p-1'>expand</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Settings
