import { useState } from 'react'
import { openLibSearch } from '../requests/book'
import { useUser } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { ToastContainer, toast } from 'react-toastify'
const Books = () => {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const {
    setUser,
    user: { books, bgColor },
  } = useUser()
  const { library, setLibrary } = useLibrary()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (title.length >= 5) {
      setLoading(true)
      const resp = await openLibSearch(title)
      setLoading(false)
      setLibrary(resp.docs)
      setTitle('')
    } else {
      toast.error('Search minimum length is 5 letters', {
        theme: 'dark',
        position: 'top-center',
        pauseOnHover: false,
        autoClose: 3000,
      })
    }
  }

  if (loading) {
    return (
      <div
        className='text-center flex flex-row flex-wrap justify-center p-20'
        style={{
          backgroundColor: bgColor,
        }}
      >
        <p className='mt-4'>Searcing...</p>
      </div>
    )
  }

  const handleAdd = (book) => {
    setUser({ bgColor, books: books.concat(book) })
    setLibrary(library.filter((e) => e.key !== book.key && e))
    toast.success(`Added ${book.title}`, {
      theme: 'dark',
      position: 'top-center',
      pauseOnHover: false,
      autoClose: 1800,
      hideProgressBar: true,
    })
  }

  return (
    <div
      className='text-center flex flex-row flex-wrap justify-center p-20'
      style={{
        backgroundColor: bgColor,
      }}
    >
      <ToastContainer />
      <div className='w-full'>
        <form onSubmit={(e) => handleSearch(e)}>
          Book title{' '}
          <input
            className='p-1 rounded-sm text-black'
            type='text'
            name='title'
            minLength={5}
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
          <button className='btn p-1 mx-1' type='submit'>
            Search
          </button>
          <button className='btn p-1 mx-1' onClick={() => nav(-1)}>
            Go back
          </button>
        </form>
      </div>

      <div className='text-start'>
        {!loading && library.length === 0 && (
          <p className='mt-4 self-center'>
            Start by searching for a book title
          </p>
        )}

        {library.length > 0 && (
          <>
            <table className='mt-4'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Pagecount</th>
                  <th>Release year</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {library &&
                  library.map((book, index) => (
                    <tr key={book.key} className='p-2 border-2'>
                      <td>{book.title}</td>
                      <td>{book.author_name}</td>
                      <td>{book.number_of_pages_median}</td>
                      <td>{book.first_publish_year}</td>
                      <td>
                        <Link to={`/books/${index}`} className='btn mx-2 p-1'>
                          Expand
                        </Link>
                      </td>
                      <td>
                        <button
                          className='btn mx-2 p-1'
                          onClick={() => handleAdd(book)}
                        >
                          Add to books
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default Books
