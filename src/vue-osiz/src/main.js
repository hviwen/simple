import './assets/main.css'
import './plugins/assets';

import {createApp} from 'vue'
import App from './App.vue'
import {setupDayjs, setupLoading, setupNProgress} from "./plugins/index.js";
import {setupI18n} from "./locales/index.js";
import {setupStore} from "./store";

async function setupApp() {
  setupLoading()

  setupNProgress()

  setupDayjs()

  const app = createApp(App)

  setupStore(app);

  setupI18n(app)

  app.mount('#app')
}

setupApp()