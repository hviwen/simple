function createColorPaletteVars() {
  const colors = ['primary', 'info', 'success', 'warning', 'error']
  const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const colorPaletteVar = {}

  colors.forEach(color => {
    colorPaletteVar[color] = `rgb(var(--${color}-color))`
    colorPaletteNumbers.forEach(number => {
      colorPaletteVar[`${color}-${number}`] = `rgb(var(--${color}-${number}-color))`
    })
  })

  return colorPaletteVar
}

const colorPaletteVars = createColorPaletteVars()

export const themeVars = {
  colors: {
    ...colorPaletteVars,
    nprogress: 'rgb(var(--nprogress-color))',
    container: 'rgb(var(--container-bg-color))',
    layout: 'rgb(var(--layout-bg-color))',
    inverted: 'rgb(var(--inverted-bg-color))',
    'base-text': 'rgb(var(--base-text-color))'
  },
  boxShadow: {
    header: 'var(--header-box-shadow)',
    slider: 'var(--slider-box-shadow)',
    tab: 'var(--tab-box-shadow)'
  }
}