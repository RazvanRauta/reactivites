import axios, { AxiosResponse } from 'axios'

import { Activity } from '@/app/models/activity'

const sleep = (delay: number) => {
  return new Promise((resolve) => {
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
    return Promise.reject(error)
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response?.data

const requests = {
  get: <T>(url: string, abortSignal?: AbortSignal) =>
    axios.get<T>(url, { signal: abortSignal }).then(responseBody),
  post: <T>(url: string, body: Record<string, unknown>, abortSignal?: AbortSignal) =>
    axios.post<T>(url, body, { signal: abortSignal }).then(responseBody),
  put: <T>(url: string, body: Record<string, unknown>, abortSignal?: AbortSignal) =>
    axios.put<T>(url, body, { signal: abortSignal }).then(responseBody),
  del: <T>(url: string, abortSignal?: AbortSignal) =>
    axios.delete<T>(url, { signal: abortSignal }).then(responseBody),
}

const Activities = {
  list: (abortSignal?: AbortSignal) =>
    requests.get<Activity[]>('/activities', abortSignal),
  details: (id: string, abortSignal?: AbortSignal) =>
    requests.get<Activity>(`/activities/${id}`, abortSignal),
  create: (activity: Activity, abortSignal?: AbortSignal) =>
    requests.post<void>('/activities', activity, abortSignal),
  update: (activity: Activity, abortSignal?: AbortSignal) =>
    requests.put<void>(`/activities/${activity.id}`, activity, abortSignal),
  delete: (id: string, abortSignal?: AbortSignal) =>
    requests.del<void>(`/activities/${id}`, abortSignal),
}

const api = {
  Activities,
}

export default api
