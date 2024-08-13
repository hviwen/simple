import {addColorAlpha, transformColorWithOpacity} from '@osiz/color'

export const ACTIVE_COLOR = '#1890ff'

function createCssVars(props) {
  return {
    '--soy-primary-color': props.primaryColor,
    '--soy-primary-color1': props.primaryColor1,
    '--soy-primary-color2': props.primaryColor2,
    '--soy-primary-color-opacity1': props.primaryColorOpacity1,
    '--soy-primary-color-opacity2': props.primaryColorOpacity2,
    '--soy-primary-color-opacity3': props.primaryColorOpacity3
  }
}

export function createTabCssVars(primaryColor) {
  const cssProps = {
    primaryColor,
    primaryColor1: transformColorWithOpacity(primaryColor, 0.1, '#ffffff'),
    primaryColor2: transformColorWithOpacity(primaryColor, 0.3, '#000000'),
    primaryColorOpacity1: addColorAlpha(primaryColor, 0.1),
    primaryColorOpacity2: addColorAlpha(primaryColor, 0.15),
    primaryColorOpacity3: addColorAlpha(primaryColor, 0.3)
  };

  return createCssVars(cssProps)
}
