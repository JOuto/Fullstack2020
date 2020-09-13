import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const createNew = async (content) => {
    const randomId = (100000 * Math.random()).toFixed(0)
    const object = { content, id: randomId, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}
const newVote = async (data) => {

    const response = await axios.put(`${baseUrl}/${data.id}`, data)
    return response.data
}

export default { getAll, createNew, newVote }