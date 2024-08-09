import process from "node:process";
import path from "node:path";
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

import {
  AntDesignVueResolver,
  NaiveUiResolver
} from 'unplugin-vue-components/resolvers';

import {FileSystemIconLoader} from 'unplugin-icons/loaders';

import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

export function setupUnPlugin(viteEnv) {
  const {VITE_ICON_PREFIX = 'icon', VITE_ICON_LOCAL_PREFIX = 'local-icon'} = viteEnv

  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon');

  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  const plugins = [
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      defaultClass: 'inline-block'
    }),
    Components({
      dts: '',
      types: [{from: 'vue-router', names: ['RouterLink', 'RouterView']}],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        }),
        NaiveUiResolver(),
        IconsResolver({customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX})
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    })
  ]

  return plugins
}