/**
 * Create service config by current env
 *
 * @param env The current env
 */
export function createServiceConfig(env) {
  const {VITE_SERVICE_BASE_URL, VITE_OTHER_SERVICE_BASE_URL} = env;

  let other = {}
  try {
    other = JSON.parse(VITE_OTHER_SERVICE_BASE_URL);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('VITE_OTHER_SERVICE_BASE_URL is not a valid JSON string');
  }

  const httpConfig = {
    baseURL: VITE_SERVICE_BASE_URL,
    other
  };

  const otherHttpKeys = Object.keys(httpConfig.other)

  const otherConfig = otherHttpKeys.map(key => {
    return {
      key,
      baseURL: httpConfig.other[key],
      proxyPattern: createProxyPattern(key)
    };
  });

  const config = {
    baseURL: httpConfig.baseURL,
    proxyPattern: createProxyPattern(),
    other: otherConfig
  };

  return config;
}

/**
 * get backend service base url
 *
 * @param env - the current env
 * @param isProxy - if use proxy
 */
export function getServiceBaseURL(env, isProxy) {
  const {baseURL, other} = createServiceConfig(env);

  const otherBaseURL = {};

  other.forEach(item => {
    otherBaseURL[item.key] = isProxy ? item.proxyPattern : item.baseURL;
  });

  return {
    baseURL: isProxy ? createProxyPattern() : baseURL,
    otherBaseURL
  };
}

/**
 * Get proxy pattern of backend service base url
 *
 * @param key If not set, will use the default key
 */
function createProxyPattern(key) {
  if (!key) {
    return '/proxy-default';
  }

  return `/proxy-${key}`;
}
