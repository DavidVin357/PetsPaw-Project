import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.thedogapi.com/v1/',
  headers: {
    'x-api-key': process.env.REACT_APP_DOG_API_KEY,
  },
})
