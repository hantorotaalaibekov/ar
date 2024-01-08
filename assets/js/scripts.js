import { MODE, TAB_TYPES, MODEL_TYPE } from './config.js'


// loader
const loader = document.querySelector('#js-loader')
const loader_text = document.querySelector('#js-loader-text')

function hideLoader() {
  loader.classList.add('hide')
}

function setLoaderText(text, status) {
  loader_text.innerHTML = text

  if (status) {
    loader.classList.remove('hide')
    loader_text.classList.add(status)
  }
}


// models
function watchModels() {
  const models = document.querySelectorAll('.model-item')

  if (models.length === 0) {
    hideLoader()
    return
  }

  let loaded = 0
  let error = 0

  models.forEach((model) => {
    model.addEventListener('model-loaded', () => {
      if (++loaded + error === models.length) hideLoader()
    })
    model.addEventListener('model-error', () => {
      if (++error + loaded === models.length) hideLoader()
    })
  })
}

function filterModels(tab) {
  const types = TAB_TYPES[tab]
  const models = document.querySelectorAll('.model-item')

  models.forEach(model => {
    const type = model.getAttribute('data-object-type')
    const opacity = types.includes(type) ? 0.7 : 0

    model.setAttribute('mesh-color', { opacity: opacity })
  })
}

function getTabModels(tab) {
  const tab_models = []
  const types = TAB_TYPES[tab]
  const models = document.querySelectorAll('.model-item')

  Array.from(models).some(model => {
    const type = model.getAttribute('data-object-type')
    types.includes(type) && tab_models.push(getModelType(type))
  })

  return [...new Set(tab_models)]
}

function getModelType(model) {
  return Object.keys(MODEL_TYPE).find(item => MODEL_TYPE[item].includes(model))
}


// tab
const tab = document.querySelector('#js-tab')
const tabs = tab.querySelectorAll('.tab__item')

tab.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab__item')) {
    tabs.forEach(item => {
      item.classList.remove('is-active')
    })
    e.target.classList.add('is-active')

    setInfo(e.target.getAttribute('data-tab'))
    filterModels(e.target.getAttribute('data-tab'))
  }
})


// range
const range_input = document.querySelector('#js-range-input')
const range_value = document.querySelector('#js-range-value')
const camera = document.querySelector('a-camera')

range_input.addEventListener("input", () => {
  const value = range_input.value

  range_value.innerHTML = `${value}m`
  camera.setAttribute('height-offset', { value: value })
})


// info
const info_status = document.querySelector('#js-info-status')
const info_type = document.querySelector('#js-info-type')

function setInfo(tab = '1') {
  const tab_text = { 1: '土石流', 2: '急傾斜地', 3: '地すべり' }
  const tab_models = getTabModels(tab)

  tab_models.length ? setInfoFull() : setInfoEmpty()

  function setInfoFull() {
    info_type.style.display = 'block'
    info_status.innerHTML = '現在地から1㎞圏内の災害リスク'

    if (MODE === 'risk') {
      info_type.innerHTML = getInfoRisk()
    } else if (MODE === 'warn') {
      info_type.innerHTML = getInfoWarn(1, '1', '2') + getInfoWarn(2, '3', '4')
    }
  }

  function setInfoEmpty() {
    info_type.style.display = 'none'
    const mode_text = { risk: ' 危険箇所 ', warn: '（特別）警戒区域 ' }

    info_status.innerHTML = `
      現在地から1㎞圏内に<br/>
      ${tab_text[tab]}${mode_text[MODE]}はありません
    `
  }

  function getInfoRisk() {
    const risk_text = { 1: ' 危険区域', 2: '崩壊 危険区域', 3: ' 危険箇所' }

    let risk = ''
    risk += `<span class="info__type rt_${tab}"></span>`
    risk += `${tab_text[tab]}${risk_text[tab]}`
    return risk
  }

  function getInfoWarn(t, t1, t2) {
    const warn_text = { 1 :'特別警戒区域', 2 :'警戒区域' }
    const isT1 = tab_models.includes(t1)
    const isT2 = tab_models.includes(t2)

    let warn = ''
    if (isT1 || isT2) {
      warn += `${tab_text[tab]} ${warn_text[t]}（`
      if (isT1) warn += `<span class="info__type wt_${t1}"></span>指定`
      if (isT1 && isT2) warn += ' '
      if (isT2) warn += `<span class="info__type wt_${t2}"></span>公表`
      warn += '）<br/>'
    }
    return warn
  }
}


export { setLoaderText, watchModels, getModelType, setInfo}
