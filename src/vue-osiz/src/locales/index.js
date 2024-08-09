import {createI18n} from 'vue-i18n'

import {localStg} from '../utils/storage'
import messages from './locale.js'

const i18n = createI18n({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export function setupI18n(app) {
  app.use(i18n)
}

export const $t = i18n.global.t

export function setLocale(lang) {
  localStg.set('lang', lang)
  i18n.global.locale = lang
}