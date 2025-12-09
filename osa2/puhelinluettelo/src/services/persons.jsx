import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const serverUrl = 'http://localhost:3001'
const idUrl = 'http://localhost:3001/meta/0'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    
    
    const request = axios.post(baseUrl, newObject)
    incrementId()
    return request.then(response => response.data)
}

const update = (id, newNumber) => {
    
    const request = axios.patch(`${baseUrl}/${id}`, { number: newNumber })
    return request.then(response => response.data)
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const getId = () =>{
    const request = axios.get(idUrl)

    return request.then(response => response.data)
    
}



const incrementId = async () => {
    const meta = await getId()
    const newid = Number(meta.lastId) +1
    await updateId(newid)
}

const updateId = async (newId) => {
    await axios.patch(idUrl, { lastId: newId })
}

export default {getAll, create, update, remove, getId}