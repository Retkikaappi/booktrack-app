import axios from 'axios'

export const openLibSearch = async (search) => {
  const resp = await axios.get(
    `https://openlibrary.org/search.json?q=${search}`
  )
  return resp.data
}
