import instance from '.'

export const saveNotificationToken = (body) => instance.post('/token', body)
