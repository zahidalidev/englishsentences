import axios from "axios";

const BASE_API_END_POINT = 'https://api.englishsentences.in/api'

const instance = axios.create({
  baseURL: BASE_API_END_POINT,
  timeout: 150000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance