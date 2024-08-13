import {effectScope, nextTick, onScopeDispose, ref, watch} from 'vue';
import {defineStore} from 'pinia';
import {breakpointsTailwind, useBreakpoints, useEventListener, useTitle} from '@vueuse/core';
import {useBoolean} from '@osiz/hooks';
import {SetupStoreId} from '@/enum';
import {$t, setLocale} from '@/locales';
import {setDayjsLocale} from '@/locales/dayjs';
import {localStg} from '@/utils/storage';

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const scope = effectScope();
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const {bool: themeDrawerVisible, setTrue: openThemeDrawer, setFalse: closeThemeDrawer} = useBoolean();
  const {bool: reloadFlag, setBool: setReloadFlag} = useBoolean(true);
  const {bool: fullContent, toggle: toggleFullContent} = useBoolean();
  const {bool: contentXScrollable, setBool: setContentXScrollable} = useBoolean();
  const {bool: sliderCollapse, setBool: setSliderCollapse, toggle: toggleSliderCollapse} = useBoolean();
  const {
    bool: mixSliderFixed,
    setBool: setMixSliderFixed,
    toggle: toggleMixSliderFixed
  } = useBoolean(localStg.get('mixSliderFixed') === 'Y');

  const isMobile = breakpoints.smaller('sm');

  async function reloadPage(duration = 300) {
    setReloadFlag(false)

    await new Promise(resolve => setTimeout(resolve, duration))

    setReloadFlag(true)
  }

  const locale = ref(localStg.get('lang') || 'zh-CN');

  const localeOptions = [
    {label: '简体中文', key: 'zh-CN'},
    {label: 'English', key: 'en-US'}
  ];

  function changeLocale(lang) {
    locale.value = lang;
    setLocale(lang);
    setDayjsLocale(lang);
    localStg.set('lang', lang);
  }

  function init() {
    setLocale(locale.value);
    setDayjsLocale(locale.value);
  }

  scope.run(() => {
    watch(isMobile, (val) => {
      if (val) {
        localStg.set('backupThemeSettingBeforeIsMobile', {
          layout: 'themeStore.layout.mode',
          sliderCollapse: 'sliderCollapse.value'
        })

        // themeStore.setThemeLayout('vertical');
        setSliderCollapse(true);
      } else {
        const backup = localStg.get('backupThemeSettingBeforeIsMobile');

        if (backup) {
          nextTick(() => {
            // themeStore.setThemeLayout(backup.layout);
            // setSliderCollapse(backup.sliderCollapse);
            localStg.remove('backupThemeSettingBeforeIsMobile');
          })
        }
      }
    }, {
      immediate: true
    })

    watch(locale, () => {
      setDayjsLocale(locale.value)
    })
  })

  useEventListener(window, 'beforeunload', () => {
    localStg.set('mixSliderFixed', mixSliderFixed.value ? 'Y' : 'N')
  })

  onScopeDispose(() => {
    scope.stop()
  })

  init()

  return {
    isMobile,
    reloadFlag,
    reloadPage,
    fullContent,
    locale,
    localeOptions,
    changeLocale,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer,
    toggleFullContent,
    contentXScrollable,
    setContentXScrollable,
    sliderCollapse,
    setSliderCollapse,
    toggleSliderCollapse,
    mixSliderFixed,
    setMixSliderFixed,
    toggleMixSliderFixed
  }
})