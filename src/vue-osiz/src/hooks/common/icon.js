import {useSvgIconRender} from '@osiz/hooks'

import SvgIcon from '@/components/custom/svg-icon.vue'

export function useSvgIcon() {
  const {SvgIconNode} = useSvgIconRender(SvgIcon)

  return {
    SvgIconNode
  }
}