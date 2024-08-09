import {getColorName, getDeltaE, getHsl, isValidColor, getHex} from '../shared';
import {colorPalettes} from '../constant';

export function getRecommendedColorPalette(color) {
  const colorPaletteFamily = getRecommendedColorPaletteFamily(color);
  const colorMap = new Map()

  colorPaletteFamily.palettes.forEach(palette => {
    colorMap.set(palette.number, palette)
  })
  const mainColor = colorMap.get(500);
  const matchColor = colorPaletteFamily.palettes.find(palette => palette.hex === color);

  const colorPalette = {
    ...colorPaletteFamily,
    colorMap,
    main: mainColor,
    match: matchColor
  }

  return colorPalette
}

export function getRecommendedPaletteColorByNumber(color, number) {
  const colorPalette = getRecommendedColorPalette(color);
  const {hex} = colorPalette.colorMap.get(number);
  return hex
}

export function getRecommendedColorPaletteFamily(color) {
  if (!isValidColor(color)) {
    throw new Error('Invalid color, please check color value!');
  }

  let colorName = getColorName(color);

  colorName = colorName.toLowerCase().replace(/\s/g, '-');

  const {h: h1, s: s1} = getHsl(color);

  const {nearestLightnessPalette, palettes} = getNearestColorPaletteFamily(color, colorPalettes);

  const {number, hex} = nearestLightnessPalette;

  const {h: h2, s: s2} = getHsl(hex);

  const deltaH = h1 - h2;

  const sRatio = s1 / s2;

  const colorPaletteFamily = {
    name: colorName,
    palettes: palettes.map(palette => {
      let hexValue = color;

      const isSame = number === palette.number;

      if (!isSame) {
        const {h: h3, s: s3, l} = getHsl(palette.hex);

        const newH = deltaH < 0 ? h3 + deltaH : h3 - deltaH;
        const newS = s3 * sRatio;

        hexValue = getHex({
          h: newH,
          s: newS,
          l
        });
      }

      return {
        hex: hexValue,
        number: palette.number
      };
    })
  };

  return colorPaletteFamily;
}


function getNearestColorPaletteFamily(color, families) {
  const familyWithConfig = families.map(family => {
    const palettes = family.palettes.map(palette => {
      return {
        ...palette,
        delta: getDeltaE(color, palette.hex)
      }
    })
    const nearestPalette = palettes.reduce((prev, curr) => (prev.delta < curr.delta ? prev : curr));

    return {
      ...family,
      palettes,
      nearestPalette
    }
  });

  const nearestPaletteFamily = familyWithConfig.reduce((prev, curr) =>
    prev.nearestPalette.delta < curr.nearestPalette.delta ? prev : curr
  );

  const {l} = getHsl(color)

  const paletteFamily = {
    ...nearestPaletteFamily,
    nearestLightnessPalette: nearestPaletteFamily.palettes.reduce((prev, curr) => {
      const {l: prevLightness} = getHsl(prev.hex);
      const {l: currLightness} = getHsl(curr.hex);

      const deltaPrev = Math.abs(prevLightness - l);
      const deltaCurr = Math.abs(currLightness - l);

      return deltaPrev < deltaCurr ? prev : curr;
    })
  }
  return paletteFamily
}