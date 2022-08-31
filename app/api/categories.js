import axios from 'axios'

export const fetchAllCategories = async () =>
  await axios.get('https://api.englishsentences.in/api/category')
