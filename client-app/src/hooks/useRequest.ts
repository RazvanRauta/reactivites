/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, Method } from 'axios'
import { useCallback, useState } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

interface UseDataProps<T> {
  url: string
  method: Method
  onSuccess?: (val: T | null) => void
  body?: any
}

export type DoRequestType<T = Record<string, unknown>> = (props?: T) => Promise<void>

const useRequest = <T>({ url, method, onSuccess, body = {} }: UseDataProps<T>) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)

  const doRequest: DoRequestType = useCallback(
    async (props = {}) => {
      setLoading(true)
      try {
        const response = await axios({
          url,
          method,
          data: { ...body, ...props },
        })
        const dataObj = response?.data
        setData(dataObj)
        if (onSuccess) {
          onSuccess(dataObj)
        }
      } catch (err: unknown) {
        const errorObj = err as Error | AxiosError<{ error: any }>

        if (axios.isAxiosError(errorObj)) {
          if (errorObj.code === AxiosError.ERR_CANCELED) {
            return
          }
          setError(errorObj?.response?.data?.error?.message || errorObj.message)
        } else {
          setError(errorObj.message)
        }

        console.error(errorObj)
      } finally {
        setLoading(false)
      }
    },
    [url, method, body, onSuccess]
  )

  return { loading, error, data, doRequest }
}

export default useRequest
