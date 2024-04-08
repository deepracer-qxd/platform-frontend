import axios, { AxiosInstance } from "axios"
import { parseCookies } from "nookies"


export function getApiClient(ctx?: any): AxiosInstance {
  const { 'deep.auth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
  })

  if(token) api.defaults.headers['Authorization'] = `Bearer ${token}`

  return api
}