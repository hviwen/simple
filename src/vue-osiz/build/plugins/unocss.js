import process from 'node:process';
import path from 'node:path';

import UnoCss from 'unocss/vite';
import {presetIcons} from "unocss";
import {FileSystemIconLoader} from '@iconify/utils/lib/loader/node-loaders';

export function setupUnoCss(viteEnv) {
  const {VITE_ICON_PREFIX = 'icon', VITE_ICON_LOCAL_PREFIX = 'local-icon'} = viteEnv
  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon');

  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  return UnoCss({
    presets: [
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: 'inline-block',
        },
        collections: {
          [collectionName]: {
            [collectionName]: FileSystemIconLoader(localIconPath, svg =>
              svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
            )
          },
          warn: true
        }
      })
    ]
  })
}