export function getContentType(config) {
  return config.header?.['Content-Type'] || 'application/json'
}

export function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304
}

export function isResponseJson(response) {
  const {responseType} = response.config
  return responseType === 'json' || responseType === undefined;
}