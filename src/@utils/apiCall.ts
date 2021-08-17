
import qs from 'qs'
// import { API } from '@constants/app'
const API_URL = process.env.REACT_APP_API;

export const apiCall = async (url: string, method: 'get' | 'post' | 'put' | 'delete', params: any) => {
  const query = method === 'post' ||
    method === 'put' ||
    method === 'delete' 
    ? JSON.stringify(params)
    : qs.stringify(params, { arrayFormat: 'brackets' })

  const fullUrl = method === 'post' ||
    method === 'put' ||
    method === 'delete'
    ? `${API_URL}${url}?${query}`
    : `${API_URL}${url}`

  const options = method === 'post' ||
    method === 'put' ||
    method === 'delete'
    ? {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: query
    }
    : undefined

  try {
    const response = await fetch(fullUrl, options).then(res => res.json())
    if (response.code > 300) {
      throw response
    } else {
      return response
    }
  } catch (error) {
    throw error
  }
  
}