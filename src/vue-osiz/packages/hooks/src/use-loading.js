import useBoolean from './use-boolean'

function useLoading(initialValue = false) {
  const {
    bool: loading,
    setTrue: startLoading,
    setFalse: endLoading,
  } = useBoolean(initialValue)

  return {
    loading,
    startLoading,
    endLoading,
  }
}

export default useLoading