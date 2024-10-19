import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(resp => resp.data)
}
  
const create = newObject => {
    return axios.post(baseUrl, newObject).then(resp => resp.data)
}
  
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(resp => resp.data)
}

const deleteItem = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(resp => resp.data)
}

export default {getAll, create, update, deleteItem}