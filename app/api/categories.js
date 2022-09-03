import instance from '.'

export const fetchAllCategories = () => instance.get('/quiz')

export const fetchSubCategories = async(page, id) => await instance.get(`/sub/quiz/${id}?page=${page}`)

export const fetchQuestions = (id) => instance.get(`/sub/quiz/question/${id}`)