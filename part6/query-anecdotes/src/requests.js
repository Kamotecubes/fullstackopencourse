import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
  axios.get(baseUrl).then(res => res.data)


export const createNew = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

export const updateAnecdote = content => 
    axios.put(`${baseUrl}/${content.id}`, content).then(res => res.data)