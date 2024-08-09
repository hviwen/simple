import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  presetUno,
} from 'unocss'

import {presetUnoAdmin} from "@osiz/uno-preset";
import {themeVars} from "./src/theme/vars.js";

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      'icon': '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem'
    }
  },
  shortcuts: {
    'card-wrapper': 'rd-8px shadow-sm'
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetUno({dark: 'class'}),
    presetUnoAdmin()
  ]
})