import axios, { AxiosRequestConfig } from 'axios'
import { getSession, signOut } from 'next-auth/react'

import { API } from './api'

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
})

axiosInstance.interceptors.request.use(async (request) => {
  if (!isAccessTokenAttachedToAxiosDefaults())
    await setAccessTokenOnRequestAndAsAxiosDefaults(request)
  return request
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      signOut({
        redirect: false,
      })
      unsetAccessTokenAttachedToAxiosDefaults()
      console.error('Unauthorized')
    }
    return Promise.reject(error)
  }
)

const isAccessTokenAttachedToAxiosDefaults = () => {
  const authHeader = axiosInstance.defaults.headers.common['Authorization']
  if (authHeader === null || authHeader === undefined || authHeader === '') return false
  else return true
}

const setAccessTokenOnRequestAndAsAxiosDefaults = async (request: AxiosRequestConfig) => {
  const session = await getSession()
  if (session) {
    const AuthHeaderValue = `Bearer ${session.user.access_token}`
    if (!request.headers) request.headers = {}
    request.headers.Authorization = AuthHeaderValue

    axiosInstance.defaults.headers.common['Authorization'] = AuthHeaderValue
  }
}

export const unsetAccessTokenAttachedToAxiosDefaults = () => {
  delete axiosInstance.defaults.headers.common['Authorization']
}

export default axiosInstance
