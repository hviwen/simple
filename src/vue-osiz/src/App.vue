<script setup>
import {NConfigProvider, darkTheme} from 'naive-ui';
import {naiveDateLocales, naiveLocales} from "@/locales/naive.js";
import {useAppStore} from './store/modules/app';
import {useThemeStore} from "./store/modules/theme";

// import HelloWorld from './views/home/modules/HelloWorld.vue'
// import TheWelcome from './views/home/modules/TheWelcome.vue'
import {computed} from "vue";

defineOptions({
  name: 'App'
});

const appStore = useAppStore();
const themeStore = useThemeStore()

const naiveDarkTheme = computed(() => {
  return themeStore.darkMode ? darkTheme : undefined;
});

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});

</script>

<template>
  <NConfigProvider
      :theme="naiveDarkTheme"
      :theme-overrides="themeStore.naiveTheme"
      :locale="naiveLocale"
      :date-locale="naiveDateLocale"
      class="h-full"
  >
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </NConfigProvider>

</template>

<style scoped>
</style>
