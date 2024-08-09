import {fileURLToPath, URL} from 'node:url'
import process from 'node:process';

import {defineConfig, loadEnv} from 'vite'
import {getBuildTime} from "./build/config/time.js";
import {setupVitePlugins} from "./build/plugins/index.js";

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())
  const buildTime = getBuildTime()

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss"; as *`
        }
      }
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
  }
})
