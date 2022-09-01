import instance from '.'

export const fetchAllCategories = () => instance.get('/quiz')

export const fetchSubCategories = (page, id) => instance.get(`/sub/quiz/5?page=1`)
