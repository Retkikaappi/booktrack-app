const Home = ({ books }) => {
  return (
    <div className='text-center flex flex-row justify-center p-20'>
      {books.map((e) => (
        <div
          key={e.author}
          className='
          flex flex-col flex-wrap
          justify-between
          h-80 w-60 
          bg-blue-600 border-2 
          border-lime-200 m-4
          text-xl font-bold leading-10
          p-10'
        >
          <h4>{e.title}</h4>
          <h4>{e.author}</h4>
          <button className='border-2'>Done</button>
        </div>
      ))}
    </div>
  )
}

export default Home
