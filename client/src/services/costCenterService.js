import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/cc/'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  console.log(response)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}${id}`, newObject)
  return response.data
}

const deleteOne = async (id) => {
  const response = await axios.delete(`${baseUrl}${id}`)
  return response.data
}

const service = {
  getAll,
  getOne,
  create,
  update,
  deleteOne
}

export default service
