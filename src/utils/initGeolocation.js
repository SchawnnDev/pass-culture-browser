import { Logger } from 'pass-culture-shared'
import {
  setGeolocationPosition,
  setGeolocationWatchId,
} from '../reducers/geolocation'

const initGeolocation = store => {
  Logger.log('Geoloc queried')
  if (!navigator.geolocation || !navigator.geolocation.watchPosition) {
    Logger.log('No Geoloc here')
    return
  }
  const watchId = navigator.geolocation.watchPosition(
    position => {
      Logger.log('Geoloc received', position)
      store.dispatch(setGeolocationPosition(position.coords))
    },
    err => Logger.warn('Could not get geoloc', err),
    {
      enableHighAccuracy: false,
      maximumAge: 10 * 60 * 1000, // 10 minutes
      timeout: 5 * 1000, // 5 seconds
    }
  )
  store.dispatch(setGeolocationWatchId(watchId))
}

export default initGeolocation
