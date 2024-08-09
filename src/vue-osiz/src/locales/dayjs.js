import {locale} from 'dayjs'
import 'dayjs/locale/zh-cn.js'
import 'dayjs/locale/en.js'

import {localStg} from '../utils/storage.js'

export function setDayjsLocale(lang = 'zh-CN') {
  const localMap = {
    'zh-CN': 'zh-cn',
    'en-US': 'en'
  }
  const l = lang || localStg.get('lang') || 'zh-CN'

  locale(localMap[l])
}