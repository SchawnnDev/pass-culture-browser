import { isMoment } from 'moment'

const format = 'YYYYMMDD'

const isSameDayInEachTimezone = (a, b) => {
  if (!isMoment(a) || !isMoment(a)) return false
  // We use format so that each date is converted to a day in its own timezone
  return a.format(format) === b.format(format)
}

export default isSameDayInEachTimezone
