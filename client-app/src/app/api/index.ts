import axios, { AxiosResponse } from 'axios'

import { Activity } from '@/app/models/activity'

const sleep = async (delay: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000)
    return response
  } catch (error) {
    console.error(error)
    return await Promise.reject(error)
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response?.data

const requests = {
  get: async <T>(url: string, abortSignal?: AbortSignal) =>
    await axios.get<T>(url, { signal: abortSignal }).then(responseBody),
  post: async <T>(
    url: string,
    body: Record<string, unknown>,
    abortSignal?: AbortSignal
  ) => await axios.post<T>(url, body, { signal: abortSignal }).then(responseBody),
  put: async <T>(url: string, body: Record<string, unknown>, abortSignal?: AbortSignal) =>
    await axios.put<T>(url, body, { signal: abortSignal }).then(responseBody),
  del: async <T>(url: string, abortSignal?: AbortSignal) =>
    await axios.delete<T>(url, { signal: abortSignal }).then(responseBody),
}

const Activities = {
  list: async (abortSignal?: AbortSignal) =>
    await requests.get<Activity[]>('/activities', abortSignal),
  details: async (id: string, abortSignal?: AbortSignal) =>
    await requests.get<Activity>(`/activities/${id}`, abortSignal),
  create: async (activity: Activity, abortSignal?: AbortSignal) =>
    await requests.post<undefined>('/activities', activity, abortSignal),
  update: async (activity: Activity, abortSignal?: AbortSignal) =>
    await requests.put<undefined>(`/activities/${activity.id}`, activity, abortSignal),
  delete: async (id: string, abortSignal?: AbortSignal) =>
    await requests.del<undefined>(`/activities/${id}`, abortSignal),
}

const api = {
  Activities,
}

export default api
