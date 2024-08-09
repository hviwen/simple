import {extend} from 'dayjs'
import localData from 'dayjs/plugin/localeData.js'
import {setDayjsLocale} from '../locales/dayjs.js'

export function setupDayjs() {
  extend(localData)
  setDayjsLocale()
}