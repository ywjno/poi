import path from 'path-extra'
import glob from 'glob'

const {$, ROOT, EXROOT, config} = window

if ($('#fontawesome-css')) {
  $('#fontawesome-css').setAttribute('href', require.resolve('font-awesome/css/font-awesome.css'))
}

window.reloadCustomCss = () => {
  if (!$('#custom-css')) {
    return
  }
  $('#custom-css').setAttribute('href', `file://${EXROOT}/hack/custom.css`)
}

window.loadTheme = (theme) => {
  window.theme = theme
  const isDarkTheme = /(dark|black|slate|superhero|papercyan)/i.test(theme)
  if (!isDarkTheme) {
    theme = 'paperdark'
  }
  if (!$('#bootstrap-css')) {
    return
  }
  if (theme === '__default__') {
    $('#bootstrap-css').setAttribute('href', `file://${require.resolve('bootstrap/dist/css/bootstrap.css')}`)
  }
  else {
    $('#bootstrap-css').setAttribute('href', `file://${ROOT}/assets/themes/${theme}/css/${theme}.css`)
  }
  window.reloadCustomCss()
}

window.applyTheme = (th) => {
  config.set('poi.theme', th)
  window.loadTheme(th)
  const event = new CustomEvent('theme.change', {
    bubbles: true,
    cancelable: true,
    detail: {
      theme: th,
    },
  })
  window.dispatchEvent(event)
}

window.allThemes = glob.sync(`${ROOT}/assets/themes/*/`).map((dirPath) => (path.basename(dirPath)))
config.setDefault('poi.theme', 'paperdark')
window.loadTheme(config.get('poi.theme', 'paperdark'))
