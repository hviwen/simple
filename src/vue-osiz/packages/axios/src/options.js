import {stringify} from 'qs'
import {isHttpSuccess} from "./shared.js";

export function createDefaultOptions(options) {
  const opts = {
    onRequest: async config => config,
    isBackendSuccess: _response => true,
    onBackendFail: async () => {
    },
    transformBackendResponse: async response => response.data,
    onError: async error => error,
  }

  Object.assign(opts, options)
  return opts
}

export function createRetryOptions(config) {
  const retryConfig = {
    retries: 0
  }

  Object.assign(retryConfig, config)
  return retryConfig
}

export function createAxiosConfig(config) {
  const TEN_SECONDS = 10000
  const axiosConfig = {
    timeout: TEN_SECONDS,
    validateStatus: isHttpSuccess,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: params => stringify(params, {arrayFormat: 'repeat'}),
  }

  Object.assign(axiosConfig, config)

  return axiosConfig
}