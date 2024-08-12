<script setup>
import {NConfigProvider, darkTheme} from 'naive-ui';
import {naiveDateLocales, naiveLocales} from "@/locales/naive.js";
import {useAppStore} from './store/modules/app';
import {useThemeStore} from "./store/modules/theme";

import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
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
      <header>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>

        <div class="wrapper">
          <HelloWorld msg="You did it!"/>
        </div>
      </header>

      <main>
        <TheWelcome/>
      </main>
    </AppProvider>
  </NConfigProvider>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
