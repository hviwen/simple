import {ref} from 'vue'

function useBoolean(initialValue = false) {
  const state = ref(initialValue)
  const setBool = (value) => {
    state.value = value
  }
  const setTrue = () => {
    state.value = true
  }
  const setFalse = () => {
    state.value = false
  }
  const toggle = () => {
    state.value = !state.value
  }
  return {
    bool: state,
    setBool,
    setTrue,
    setFalse,
    toggle
  }
}

export default useBoolean