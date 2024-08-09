import './assets/main.css'
import './plugins/assets';

import {createApp} from 'vue'
import App from './App.vue'
import {setupDayjs, setupLoading, setupNProgress} from "./plugins/index.js";
import {setupI18n} from "./locales/index.js";

async function setupApp() {
  setupLoading()

  setupNProgress()

  setupDayjs()

  const app = createApp(App)

  setupI18n(app)

  app.mount('#app')
}

setupApp()