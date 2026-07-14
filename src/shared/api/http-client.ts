import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

import { appEnv } from '@/shared/config/env'

const API_TIMEOUT_MS = 10_000

export const apiClient: AxiosInstance = axios.create({
  baseURL: appEnv.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_TIMEOUT_MS,
})

apiClient.interceptors.request.use((config) => {
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export async function request<TResponse, TData = unknown>(
  config: AxiosRequestConfig<TData>,
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await apiClient.request<TResponse, AxiosResponse<TResponse>, TData>(config)
  return response.data
}
