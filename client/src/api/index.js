import axios from 'axios'

const url = 'http://localhost:4000/authFlags'
export const fetchAuthDBFlags = () => axios.get(url)


