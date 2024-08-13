import {localStg} from "@/utils/storage.js";

export function getToken() {
  return localStg.get('token') || ''
}

export function clearAuthStorage() {
  localStg.remove('token')
  localStg.remove('refreshToken')
}