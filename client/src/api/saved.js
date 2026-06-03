import axiosClient from './axiosClient'

export const getSaved = () =>
  axiosClient.get('/saved').then(r => r.data)

export const toggleSave = (careerId) =>
  axiosClient.post(`/saved/${careerId}`).then(r => r.data)

export const getSaveStatus = (careerId) =>
  axiosClient.get(`/saved/${careerId}/status`).then(r => r.data)