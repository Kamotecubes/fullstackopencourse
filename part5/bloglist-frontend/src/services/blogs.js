import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = async data => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const addLike = async id => {
  const response = await axios.put(`${baseUrl}/addLike/${id}`)
  return response.data
}

export default { getAll, saveBlog, setToken, addLike }