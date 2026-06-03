import axiosClient from './axiosClient'

export const getHiddenCareers = () =>
  axiosClient.get('/hidden-careers').then(r => r.data)

export const getHiddenCareerById = (id) =>
  axiosClient.get(`/hidden-careers/${id}`).then(r => r.data)

export const upvoteHiddenCareer = (id) =>
  axiosClient.post(`/hidden-careers/${id}/upvote`).then(r => r.data)