import {h} from 'vue'

function useSvgIconRender(SvgIcon) {

  function SvgIconNode(config) {
    const {color, fontSize, icon, localIcon} = config

    const style = {}

    if (color) {
      style['color'] = color
    }
    if (fontSize) {
      style['fontSize'] = fontSize + 'px'
    }

    if (!icon && !localIcon) {
      return undefined
    }

    return () => h(SvgIcon, {icon, localIcon, style})
  }

  return {
    SvgIconNode
  }
}

export default useSvgIconRender

