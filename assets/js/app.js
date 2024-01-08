import { GpsData } from './gps.js'
import { EntityData } from './entity.js'
import { setLoaderText } from './scripts.js'


window.addEventListener('load', () => {  
  // gps
  setLoaderText('GPSを取得する')
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const gps = new GpsData(position.coords)
      const entity = new EntityData(gps)

      window.addEventListener('gps-camera-origin-coord-set', () => {
        gps.setup()
      }, { once: true })

      entity.generate()
    },
    (error) => {
      const errorMessage = {
        0: '原因不明のエラーが発生しました。',
        1: '位置情報の取得が許可されませんでした。',
        2: '電波状況などで位置情報が取得できませんでした。',
        3: '位置情報の取得に時間がかかり過ぎてタイムアウトしました。',
      }
      setLoaderText(errorMessage[error.code], 'error')
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000
    }
  )


  // orientation
  screen.orientation.addEventListener('change', () => {
    const camera = document.getElementById('js-camera')
    const rotation = camera.getAttribute('rotation').y

    camera.setAttribute('rotation', { y: rotation })
  })
})
