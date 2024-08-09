import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevtools from 'vite-plugin-vue-devtools'
import progress from 'vite-plugin-progress'

import {setupUnoCss} from "./unocss.js";
import {setupHtmlPlugin} from "./html.js";
import {setupUnPlugin} from "./unplugin.js";

export function setupVitePlugins(viteEnv, buildTime) {
  const plugins = [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    VueDevtools(),
    setupUnoCss(viteEnv),
    ...setupUnPlugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime)
  ]
  return plugins
}