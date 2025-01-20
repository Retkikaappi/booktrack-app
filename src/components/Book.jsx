import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useUser } from '../context/UserContext'

const Book = () => {
  const nav = useNavigate()
  const { index } = useParams()
  const { library, setLibrary } = useLibrary()
  const {
    setUser,
    user: { bgColor, books },
  } = useUser()
  const book = library[index]

  if (!book) {
    return (
      <div>
        <p>Cannot find book</p>
        <button onClick={() => nav(-1)}>Go back</button>
      </div>
    )
  }

  const handleAdd = () => {
    setUser({ bgColor, books: books.concat(book) })
    setLibrary(library.filter((e) => e.key !== book.key && e))

    nav(-1)
  }

  return (
    <div className='flex flex-col items-center p-4'>
      <div>
        <button onClick={handleAdd}>Add book to books</button>
        <button onClick={() => nav(-1)}>Cancel</button>
        <h2>Title: {book.title}</h2>
        <h3>Author: {book.author_name}</h3>
        <p>First publish year: {book.first_publish_year}</p>

        {book.subject && (
          <>
            <p>subjects: </p>
            {book.subject.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </>
        )}
        <img
          width={'200px'}
          alt={`cover of ${book.title}`}
          src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
        />
      </div>
    </div>
  )
}

export default Book
