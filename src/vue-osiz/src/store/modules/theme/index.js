import {computed, effectScope, onScopeDispose, ref, toRefs, watch} from 'vue'
import {defineStore} from "pinia";
import {useEventListener, usePreferredColorScheme} from "@vueuse/core";
import {getPaletteColorByNumber} from '@osiz/color';
import {SetupStoreId} from '@/enum';
import {localStg} from "@/utils/storage.js";
import {
  addThemeVarsToGlobal,
  createThemeToken,
  getNaiveTheme,
  initThemeSettings,
  toggleAuxiliaryColor,
  toggleCssDarkMode
} from './shared.js'

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope();
  const oTheme = usePreferredColorScheme()

  const settings = ref(initThemeSettings())

  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      return oTheme.value === 'dark'
    }
    return settings.value.themeScheme === 'dark'
  })

  const grayscaleMode = computed(() => settings.value.grayscale)

  const colourWeaknessMode = computed(() => settings.value.colorWeakness)

  const themeColors = computed(() => {
    const {themeColor, otherColor, isInfoFollowPrimary} = settings.value
    const colors = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info
    }
    return colors
  })

  const naiveTheme = computed(() => getNaiveTheme(themeColors.value, settings.value.recommendColor))

  const settingsJson = computed(() => JSON.stringify(settings.value))

  function resetStore() {
    const themeStore = useThemeStore()
    themeStore.$reset()
  }

  function setThemeScheme(themeScheme) {
    settings.value.themeScheme = themeScheme
  }

  function setGrayscale(grayscale) {
    settings.value.grayscale = grayscale
  }

  function setColorWeakness(colorWeakness) {
    settings.value.colorWeakness = colorWeakness
  }

  function toggleThemeScheme() {
    const themeSchemes = ['light', 'dark', 'auto']

    const index = themeSchemes.findIndex(item => item === settings.value.themeScheme)

    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1

    const nextThemeScheme = themeSchemes[nextIndex]

    setThemeScheme(nextThemeScheme)
  }

  function updateThemeColors(key, color) {
    let colorValue = color
    if (settings.value.recommendColor) {
      colorValue = getPaletteColorByNumber(color, 500, true)
    }
    if (key === 'primary') {
      settings.value.themeColor = colorValue
    } else {
      settings.value.otherColor[key] = colorValue
    }
  }

  function setThemeLayout(mode) {
    settings.value.layout.mode = mode
  }

  function setupThemeVarsToGlobal() {
    const {
      themeTokens,
      darkThemeTokens
    } = createThemeToken(themeColors.value, settings.value.tokens, settings.value.recommendColor)
    addThemeVarsToGlobal(themeTokens, darkThemeTokens)
  }

  function setLayoutReverseHorizontalMix(reverse) {
    settings.value.layout.reverseHorizontalMix = reverse
  }

  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD
    if (!isProd) return
    localStg.set('themeSettings', settings.value)
  }

  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings()
  })

  scope.run(() => {
    watch(darkMode, val => {
      toggleCssDarkMode(val)
    }, {immediate: true});

    watch([grayscaleMode, colourWeaknessMode], val => {
      toggleAuxiliaryColor(val[0], val[1])
    }, {immediate: true});

    watch(themeColors, val => {
      setupThemeVarsToGlobal()
      localStg.set('themeColors', val.primary)
    }, {immediate: true})
  })

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    settingsJson,
    setGrayscale,
    setColorWeakness,
    resetStore,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    setThemeLayout,
    setLayoutReverseHorizontalMix
  }
})