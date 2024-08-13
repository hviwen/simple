export const LAYOUT_SCROLL_EL_ID = '__SCROLL_EL_ID__';

export const LAYOUT_MAX_Z_INDEX = 100


function createLayoutCssVarsByCssVarProps(props){
  return {
    '--soy-header-height': `${props.headerHeight}px`,
    '--soy-header-z-index': props.headerZIndex,
    '--soy-tab-height': `${props.tabHeight}px`,
    '--soy-tab-z-index': props.tabZIndex,
    '--soy-slider-width': `${props.sliderWidth}px`,
    '--soy-slider-collapsed-width': `${props.sliderCollapsedWidth}px`,
    '--soy-slider-z-index': props.sliderZIndex,
    '--soy-mobile-slider-z-index': props.mobileSliderZIndex,
    '--soy-footer-height': `${props.footerHeight}px`,
    '--soy-footer-z-index': props.footerZIndex
  }
}

export function createLayoutCssVars(props){
  const {
    mode,
    isMobile,
    maxZIndex = LAYOUT_MAX_Z_INDEX,
    headerHeight,
    tabHeight,
    sliderWidth,
    sliderCollapsedWidth,
    footerHeight
  } = props;
  const headerZIndex = maxZIndex - 3;
  const tabZIndex = maxZIndex - 5;
  const sliderZIndex = mode === 'vertical' || isMobile ? maxZIndex - 1 : maxZIndex - 4;
  const mobileSliderZIndex = isMobile ? maxZIndex - 2 : 0;
  const footerZIndex = maxZIndex - 5;

  const cssProps= {
    headerHeight,
    headerZIndex,
    tabHeight,
    tabZIndex,
    sliderWidth,
    sliderZIndex,
    mobileSliderZIndex,
    sliderCollapsedWidth,
    footerHeight,
    footerZIndex
  };

  return createLayoutCssVarsByCssVarProps(cssProps);
}

