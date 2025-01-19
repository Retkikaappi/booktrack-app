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
          rounded-md
          m-4
          p-10'
        >
          <h4 className='text-xl font-bold leading-10'>{e.title}</h4>
          <p className='text-lg'>{e.author}</p>
          <button className='btn'>Done</button>
        </div>
      ))}
    </div>
  )
}

export default Home
