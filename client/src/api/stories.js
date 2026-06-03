import axiosClient from './axiosClient'

export const getStories = () =>
  axiosClient.get('/stories').then(r => r.data)

export const getStoryById = (id) =>
  axiosClient.get(`/stories/${id}`).then(r => r.data)

export const submitStory = (data) =>
  axiosClient.post('/stories', data).then(r => r.data)