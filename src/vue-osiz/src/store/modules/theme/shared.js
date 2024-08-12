import {addColorAlpha, getColorPalette, getPaletteColorByNumber, getRgb} from '@osiz/color'
import {overrideThemeSettings, themeSettings} from '@/theme/settings'
import {themeVars} from '@/theme/vars'
import {toggleHtmlCss} from '@/utils/common'
import {localStg} from '@/utils/storage'

const DARK_CLASS = 'dark'

export function initThemeSettings() {
  const isProd = import.meta.env.PROD

  if (!isProd) {
    return themeSettings
  }

  const settings = localStg.get('themeSettings') || themeSettings

  const isOverride = localStg.get('overrideThemeFlag') !== ''

  if (!isOverride) {
    Object.assign(settings, overrideThemeSettings)
    localStg.set('overrideThemeFlag', settings)
  }

  return settings
}

export function createThemeToken(colors, tokens, recommended = false) {
  const paletteColors = createThemePaletteColors(colors, recommended)

  const {light, dark} = tokens || themeSettings.tokens

  const themeTokens = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors
    },
    boxShadow: {
      ...light.boxShadow
    }
  }

  const darkThemeTokens = {
    colors: {
      ...themeTokens.colors,
      ...dark?.colors
    },
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark.boxShadow
    }
  }

  return {
    themeTokens,
    darkThemeTokens
  }
}

function createThemePaletteColors(colors, recommended = false) {
  const colorKeys = Object.keys(colors)
  const colorPaletteVar = {}

  colorKeys.forEach(key => {
    const colorMap = getColorPalette(colors[key], recommended)
    colorPaletteVar[key] = colorMap.get(500)
    colorMap.forEach((value, number) => {
      colorPaletteVar[`${key}-${number}`] = value
    })
  })
  return colorPaletteVar
}

export function addThemeVarsToGlobal(tokens, darkTokens) {
  const cssVarStr = getCssVarByTokens(tokens)
  const darkCssVarStr = getCssVarByTokens(darkTokens)

  const css = `
  :root{
    ${cssVarStr}
  }
  `

  const darkCss = `
  html.${DARK_CLASS}{
    ${darkCssVarStr}
  }
  `

  const styleId = 'theme-vars'
  const style = document.querySelector(`#${styleId}`) || document.createElement('style')
  style.id = styleId
  style.textContent = css + darkCss
  document.head.appendChild(style)
}

function getCssVarByTokens(tokens) {
  const styles = []

  function removeVarPrefix(value) {
    return value.replace('var(', '').replace(')', '')
  }

  function removeRgbPrefix(value) {
    return value.replace('rgb(', '').replace(')', '')
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue)
      let value = tokens[key][tokenKey]

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey)
        const {r, g, b} = getRgb(value)
        value = `${r} ${g} ${b}`
      }

      styles.push(`${cssVarsKey}:${value}`)

    }
  }
  const styleStr = styles.join(';')
  return styleStr
}

export function toggleCssDarkMode(darkMode = false) {
  const {add, remove} = toggleHtmlCss(DARK_CLASS)
  if (darkMode) {
    add()
  } else {
    remove()
  }
}

export function toggleAuxiliaryColor(grayscaleMode = false, colourWeakness = false) {
  const htmlElement = document.documentElement
  htmlElement.style.filter = [grayscaleMode ? 'grayscale(100%)' : '', colourWeakness ? 'invert(80%)' : ''].filter(Boolean).join(' ')
}

function getNaiveThemeColors(colors, recommended = false) {
  const colorActions = [
    {scene: '', handler: color => color},
    {scene: 'Suppl', handler: color => color},
    {scene: 'Hover', handler: color => getPaletteColorByNumber(color, 500, recommended)},
    {scene: 'Pressed', handler: color => getPaletteColorByNumber(color, 700, recommended)},
    {scene: 'Active', handler: color => addColorAlpha(color, 0.1)}
  ]

  const themeColors = {}

  const colorEntries = Object.entries(colors)

  colorEntries.forEach(color => {
    colorActions.forEach(action => {
      const [colorType, colorValue] = color
      const colorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorValue)
    })
  })

  return themeColors
}

export function getNaiveTheme(colors, recommended = false) {
  const {primary: colorLoading} = colors

  const theme = {
    common: {
      ...getNaiveThemeColors(colors, recommended),
      borderRadius: '6px'
    },
    loadingBar: {
      colorLoading
    },
    Tag: {
      borderRadius: '6px'
    }
  }

  return theme
}