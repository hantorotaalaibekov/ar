// constants
const API_ALTITUDE = 'api/elevation.json'

const API_RISK = 'api/risk.json'
const API_WARN = 'api/warning.json'

const PATH_RISK = 'models/risk'
const PATH_WARN = 'models/warning'


// mode
const MODE = new URLSearchParams(window.location.search).get('mode')


// types
const riskTabTypes = {
  1: ['1', '2', '3', '4'],
  2: ['5', '6'],
  3: ['7', '8', '9', '10']
}

const warnTabTypes = {
  1: ['1', '2', '3', '4'],
  2: ['5', '6', '7', '8'],
  3: ['9', '10', '11', '12']
}

const TAB_TYPES = {
  risk: riskTabTypes,
  warn: warnTabTypes
}[MODE]


// models
const riskModelTypes = {
  1: ['1', '2', '3', '4'],
  2: ['5', '6'],
  3: ['7', '8', '9', '10']
}

const warnModelTypes = {
  1: ['1', '5', '9'],
  2: ['2', '6', '10'],
  3: ['3', '7', '11'],
  4: ['4', '8', '12']
}

const riskModelColors = {
  1: '#fee019',
  2: '#f39702',
  3: '#ebafdc'
}

const warnModelColors = {
  1: '#cf3f3f',
  2: '#d58181',
  3: '#eed003',
  4: '#e2d474'
}

const MODEL_TYPE = {
  risk: riskModelTypes,
  warn: warnModelTypes
}[MODE]

const MODEL_COLOR = {
  risk: riskModelColors,
  warn: warnModelColors
}[MODE]

const MODEL_PATH = {
  risk: PATH_RISK,
  warn: PATH_WARN
}[MODE]

const API_MODELS = {
  risk: API_RISK,
  warn: API_WARN
}[MODE]


export {
  MODE,
  TAB_TYPES,
  MODEL_TYPE,
  MODEL_COLOR,
  MODEL_PATH,
  API_MODELS,
  API_ALTITUDE
}
