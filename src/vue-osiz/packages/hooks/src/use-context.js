import {inject, provide} from 'vue'

function useContext(contextName, fn) {
  const {useProvide, useInject: useStore} = createContext(contextName)

  function setupStore(...args) {
    const store = fn(...args)
    useProvide(store)
    return store
  }

  return {
    setupStore,
    useStore
  }
}

function createContext(contextName) {
  const injectKey = Symbol(contextName)

  function useProvide(context) {
    provide(injectKey, context)
    return context
  }

  function useInject() {
    return inject(injectKey)
  }

  return {
    useProvide,
    useInject
  }
}

export default useContext