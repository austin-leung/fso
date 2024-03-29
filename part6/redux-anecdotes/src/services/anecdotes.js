import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
    const newObject = {
        content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, newObject)
    return response
}

const update = async (newObject) => {
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return response
}

export default { getAll, createNew, update }