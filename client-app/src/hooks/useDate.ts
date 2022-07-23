import axios, { AxiosError, Method } from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const useData = <T>(
  url: string,
  method: Method,
  body?: any
): [boolean, string | null, T | null] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const response = await axios({
          url,
          method,
          data: body,
          signal: controller.signal,
        })
        const dataObj = response?.data
        if (!ignore) {
          setData(dataObj)
        }
      } catch (err: any) {
        const errorObj = err as Error | AxiosError<{ error: any }>

        if (axios.isAxiosError(errorObj)) {
          if (errorObj.code === AxiosError.ERR_CANCELED) {
            return
          }
          if (!ignore) {
            setError(errorObj?.response?.data?.error?.message || errorObj.message)
          }
        } else if (!ignore) {
          setError(errorObj.message)
        }

        console.error(errorObj)
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchData().then((r) => r)

    return () => {
      ignore = true
      controller.abort()
    }
  }, [url])

  return [loading, error, data]
}

export default useData
