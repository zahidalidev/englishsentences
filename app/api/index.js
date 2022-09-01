import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.englishsentences.in/api',
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance