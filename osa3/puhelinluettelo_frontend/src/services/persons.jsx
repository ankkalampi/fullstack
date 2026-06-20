import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    
    
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newNumber) => {
    
    const request = axios.patch(`${baseUrl}/${id}`, { number: newNumber })
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}



export default {getAll, create, update, remove}