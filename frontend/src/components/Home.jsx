import { useUser } from '../context/UserContext'

const Home = () => {
  const {
    setUser,
    user: { bgColor, books },
  } = useUser()

  if (!books) {
    return (
      <div className='text-center m-4'>
        <p>No books</p>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className='text-center m-4'>
        <p>Books are empty</p>
      </div>
    )
  }

  const removeBook = (book) => {
    if (window.confirm(`Are you sure you want to remove book ${book.title}`)) {
      setUser({
        bgColor,
        books: books.filter((e) => e.key !== book.key && e),
      })
    }

    console.log(books)
  }

  return (
    <div className='text-center flex flex-row justify-center p-20'>
      {books.map((e) => (
        <div
          key={e.key}
          className='
          flex flex-col flex-wrap
          justify-between
          h-80 w-60 
          bg-blue-600 border-2 
          rounded-sm
          m-4
          p-10
          bg-cover bg-center'
          style={{
            backgroundImage: e.cover_edition_key
              ? `url(https://covers.openlibrary.org/b/olid/${e.cover_edition_key}-M.jpg)`
              : 'none',
          }}
        >
          <div className='bg-blue-900 bg-opacity-65 rounded-sm'>
            <h4 className='text-xl font-bold leading-10 bg-opacity-50'>
              {e.title}
            </h4>
            <p className='text-lg'>{e.author}</p>
          </div>
          <button className='btn' onClick={() => removeBook(e)}>
            Done
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
