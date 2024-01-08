import { API_ALTITUDE } from './config.js'
import { setLoaderText } from './scripts.js'


export class GpsData {
  constructor(pos) {
    this.latitude = pos.latitude
    this.longitude = pos.longitude
    this.altitude = pos.altitude
    this.accuracy = pos.accuracy
    this.altitudeAccuracy = pos.altitudeAccuracy
    this.apiAltitude = undefined
  }

  async setup() {
    this._setCameraHeight()
  }

  async _setCameraHeight() {
    const bodyHeight = 1.4
    const altitudeOffset = 5
    const altitudeAccuracy = 10
    const cameraObj = document.querySelector('a-scene').camera.el.object3D
    const offset = cameraObj.el.components?.['height-offset']?.data?.value || 0

    if (
      !isNaN(this.altitude) &&
      this.altitudeAccuracy !== null &&
      this.altitudeAccuracy < altitudeAccuracy
    ) {
      cameraObj.position.y = this.altitude + altitudeOffset + offset
      return
    }

    if (isNaN(this.apiAltitude)) {
      try {
        this.apiAltitude = await this._getAltitude()
      } catch (error) {
        setLoaderText('国土地理院標高APIから標高を取得できませんした。', 'error')
        console.error(error)
        return
      }
    }

    cameraObj.position.y =
      (!isNaN(this.apiAltitude)
        ? this.apiAltitude + bodyHeight
        : this.altitude || 0) +
      altitudeOffset +
      offset
  }


  async _getAltitude() {
    const { longitude: lon, latitude: lat } = this
    const url = `${API_ALTITUDE}?lon=${lon}&lat=${lat}&outtype=JSON`
    const response = await fetch(url)

    if (response.ok) {
      const { elevation } = await response.json()
      return parseFloat(elevation)
    } else {
      throw new Error(response.status)
    }
  }
}
