import {getHex, getHsv, isValidColor, mixColor} from '../shared';

const darkColorMap = [
  {index: 7, opacity: 0.15},
  {index: 6, opacity: 0.25},
  {index: 5, opacity: 0.3},
  {index: 5, opacity: 0.45},
  {index: 5, opacity: 0.65},
  {index: 5, opacity: 0.85},
  {index: 5, opacity: 0.9},
  {index: 4, opacity: 0.93},
  {index: 3, opacity: 0.95},
  {index: 2, opacity: 0.97},
  {index: 1, opacity: 0.98}
];

/** Hue step */
const hueStep = 2;
/** Saturation step, light color part */
const saturationStep = 16;
/** Saturation step, dark color part */
const saturationStep2 = 5;
/** Brightness step, light color part */
const brightnessStep1 = 5;
/** Brightness step, dark color part */
const brightnessStep2 = 15;
/** Light color count, main color up */
const lightColorCount = 5;
/** Dark color count, main color down */
const darkColorCount = 4;

export function getAntdPaletteColorByIndex(color, index) {
  if (!isValidColor(color)) {
    throw new Error('Color is invalid');
  }
  if (index === 0) {
    return getHex(color)
  }
  const isLight = index < 6;
  const hsv = getHsv(color);
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

  const newHsv = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  };
  return getHex(newHsv);
}

export function getAntdColorPalette(color, darkTheme = false, darkThemeMixColor = '#141414') {
  const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const patterns = indexes.map(index => getAntdPaletteColorByIndex(color, index));
  if (darkTheme) {
    const darkPatterns = darkColorMap.map(({index, opacity}) => {
      const darkColor = mixColor(darkThemeMixColor, patterns[index], opacity);

      return darkColor;
    });

    return darkPatterns.map(item => getHex(item));
  }
  return patterns
}


function getHue(hsv, i, isLight) {
  let hue;
  const hsvH = Math.round(hsv.h);

  if (hsvH >= 60 && hsvH <= 240) {
    hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * i;
  } else {
    hue = isLight ? hsvH + hueStep * i : hsvH - hueStep * i;
  }

  if (hue < 0) {
    hue += 360;
  }

  if (hue >= 360) {
    hue -= 360;
  }

  return hue;
}

function getSaturation(hsv, i, isLight) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s
  }
  let saturation;
  if (isLight) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }

  if (saturation > 100) {
    saturation = 100;
  }

  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10;
  }

  if (saturation < 6) {
    saturation = 6;
  }

  return saturation;
}

function getValue(hsv, i, isLight) {
  let value

  if (isLight) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }

  if (value > 100) {
    value = 100;
  }

  return value;
}