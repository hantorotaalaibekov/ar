import { TAB_TYPES, MODEL_COLOR, MODEL_PATH, API_MODELS } from './config.js'
import { setLoaderText, watchModels, getModelType, setInfo } from './scripts.js'


export class EntityData {
  constructor(gps) {
    this.gps = gps
    this.models = []
  }

  async generate() {
    try {
      setLoaderText('モデル取得中')
      this.models = await this._getModels()
    } catch (error) {
      setLoaderText('モデル検索でエラーが発生しました。', 'error')
      console.error(error)
      return
    }

    this.models.forEach(model => {
      if (TAB_TYPES['1'].includes(model.type)) {
        this._createEntity(model)
      }
    })
    watchModels()

    this.models.forEach(model => {
      if (!TAB_TYPES['1'].includes(model.type)) {
        this._createEntity(model)
      }
    })
    setInfo()
  }

  async _createEntity(model) {
    const entity = document.createElement('a-entity')

    entity.setAttribute('id', model.gid)
    entity.setAttribute('class', 'model-item')
    entity.setAttribute('data-object-type', model.type)
    entity.setAttribute('gltf-model', `url(${MODEL_PATH}/${model.gid}.glb)`)
    entity.setAttribute('position', { y: +model.altitude })
    entity.setAttribute('gps-projected-entity-place', {
      latitude: +model.latitude,
      longitude: +model.longitude
    })
    entity.setAttribute('mesh-color', { 
      color: MODEL_COLOR[getModelType(model.type)], 
      opacity: TAB_TYPES['1'].includes(model.type) ? 0.7 : 0
    })

    document.querySelector('a-scene').appendChild(entity)
  }

  async _getModels() {
    const { latitude: lat, longitude: lng } = this.gps
    const url = `${API_MODELS}?lat=${lat}&lng=${lng}`
    const response = await fetch(url)

    if (response.ok) {
      const { data } = await response.json()
      return data
    } else {
      throw new Error(response.status)
    }
  }
}
