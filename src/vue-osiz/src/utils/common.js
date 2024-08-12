import {$t} from '@/locales'

export function transformRecordToOptions(record) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  }))
}

export function translateOptions(options) {
  return options.map(option => ({
    ...option,
    label: $t(option.label)
  }))
}

export function toggleHtmlCss(className) {
  function add() {
    document.documentElement.classList.add(className)
  }

  function remove() {
    document.documentElement.classList.remove(className)
  }

  return {
    add,
    remove
  }
}