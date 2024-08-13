import axios, {AxiosError} from 'axios'
import axiosRetry from "axios-retry";
import {nanoid} from '@osiz/utils'
import {
  createRetryOptions,
  createDefaultOptions,
  createAxiosConfig
} from './options'

import {BACKEND_ERROR_CODE, REQUEST_ID_KEY} from './constant'

function createCommonRequest(axiosConfig, options) {
  const opts = createDefaultOptions(options)
  const axiosConf = createAxiosConfig(axiosConfig)

  const instance = axios.create(axiosConf)

  const abortControllerMap = new Map()

  const retryOptions = createRetryOptions(axiosConf)
  axiosRetry(instance, retryOptions)

  instance.interceptors.request.use(conf => {
    const config = {...conf}
    const requestId = nanoid()
    config.headers.set(REQUEST_ID_KEY, requestId)

    if (!config.signal) {
      const abortController = new AbortController()
      config.signal = abortController.signal
      abortControllerMap.set(requestId, abortController)
    }
    const handledConfig = opts.request(config) || config
    return handledConfig
  })

  instance.interceptors.response.use(async response => {
    const responseType = (response.config?.responseType) || 'json'

    if (responseType !== 'json' || opts.isBackendSuccess(response)) {
      return Promise.resolve(response)
    }
    const fail = await opts.onBackendFail(response, instance)
    if (fail) {
      return fail
    }

    const backendError = new AxiosError('the backend error', BACKEND_ERROR_CODE, response.config, response.request, response)

    await opts.onError(backendError)

    return Promise.reject(backendError)
  }, async error => {
    await opts.onError(error)
    return Promise.reject(error)
  })

  function cancelRequest(requestId) {
    const controller = abortControllerMap.get(requestId)
    if (controller) {
      controller.abort()
      abortControllerMap.delete(requestId)
    }
  }

  function cancelAllRequest() {
    for (const controller of abortControllerMap.values()) {
      controller.abort()
    }
    abortControllerMap.clear()
  }

  return {
    instance,
    opts,
    cancelRequest,
    cancelAllRequest
  }
}

export function createRequest(axiosConfig, options) {
  const {
    instance,
    opts,
    cancelRequest,
    cancelAllRequest,
  } = createCommonRequest(axiosConfig, options)

  const request = async function request(config) {
    const response = await instance(config)
    const responseType = response.config.responseType || 'json'

    if (responseType === 'json') {
      return opts.transformBackendResponse(response)
    }

    return response.data
  }

  request.cancelRequest = cancelRequest
  request.cancelAllRequest = cancelAllRequest
  request.state = {}

  return request
}

export function createFlatRequest(axiosConfig, options) {
  const {
    instance,
    opts,
    cancelRequest,
    cancelAllRequest,
  } = createCommonRequest(axiosConfig, options)

  const flatRequest = async function flatRequest(config) {
    try {
      const response = await instance(config)
      const responseType = response.config.responseType || 'json'

      if (responseType === 'json') {
        const data = opts.transformBackendResponse(response)
        return {data, error: null}
      }
      return {data: response.data, error: null}
    } catch (error) {
      return {data: null, error}
    }
  }

  flatRequest.cancelRequest = cancelRequest
  flatRequest.cancelAllRequest = cancelAllRequest
  flatRequest.state = {}

  return flatRequest
}

export {BACKEND_ERROR_CODE, REQUEST_ID_KEY}