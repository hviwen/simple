import {extend, colord} from 'colord'
import namesPlugin from "colord/plugins/names";
import mixPlugin from "colord/plugins/mix";
import labPlugin from "colord/plugins/lab";

extend([namesPlugin, mixPlugin, labPlugin]);

export function isValidColor(color) {
  return colord(color).isValid();
}

export function getHex(color) {
  return colord(color).toHex();
}

export function getRgb(color) {
  return colord(color).toRgb();
}

export function getHsl(color) {
  return colord(color).toHsl();
}

export function getHsv(color) {
  return colord(color).toHsv();
}

export function getDeltaE(color1, color2) {
  return colord(color1).delta(color2);
}

export function addColorAlpha(color, alpha) {
  return colord(color).alpha(alpha).toHex();
}

export function mixColor(color1, color2, weight) {
  return colord(color1).mix(color2, weight).toHex();
}

export function transformColorWithOpacity(color, aplha, bgColor = '#fff') {
  const originColor = addColorAlpha(color, aplha);
  const {r: oR, g: oG, b: oB} = colord(originColor).toRgb()
  const {r: bgR, g: bgG, b: bgB} = colord(bgColor).toRgb()

  function calRgb(or, bg, al) {
    return bg + (or - bg) * al
  }

  const result = {
    r: calRgb(oR, bgR, aplha),
    g: calRgb(oG, bgG, aplha),
    b: calRgb(oB, bgB, aplha)
  }

  return colord(result).toHex();
}

export function isWhiteColor(color) {
  return colord(color).isEqual('#fff');
}

export {colord}