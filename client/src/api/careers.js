import axiosClient from './axiosClient'

export const getAllCareers = () =>
  axiosClient.get('/careers').then(r => r.data)

export const getCareerById = (id) =>
  axiosClient.get(`/careers/${id}`).then(r => r.data)

export const getCareerBySlug = (slug) =>
  axiosClient.get(`/careers/slug/${slug}`).then(r => r.data)

export const getCareersByCategory = (category) =>
  axiosClient.get(`/careers/category/${category}`).then(r => r.data)

export const searchCareers = (q) =>
  axiosClient.get(`/careers/search?q=${q}`).then(r => r.data)

export const createCareer = (data) =>
  axiosClient.post('/careers', data).then(r => r.data)