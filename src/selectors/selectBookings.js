import moment from 'moment'
import get from 'lodash.get'
import { createSelector } from 'reselect'

export const filterValidBookings = bookingobj => {
  if (!bookingobj) return false
  const offer = get(bookingobj, 'stock.resolvedOffer')
  if (!offer) return false
  const offerType = get(offer, 'eventOrThing.type')
  if (!offerType) return false
  const isActivationType =
    offerType === 'EventType.ACTIVATION' || offerType === 'ThingType.ACTIVATION'
  return !isActivationType
}

export const filterBookingsInLessThanTwoDays = (
  filtered,
  momentNowMock = null
) => {
  const nowMoment = momentNowMock || moment()
  const twoDaysFromNow = nowMoment.clone().add(2, 'days')
  const results = filtered.filter(booking => {
    const date = get(booking, 'stock.eventOccurrence.beginningDatetime')
    const hasBeginningDatetime = Boolean(date)
    const isAfterNow = moment(date).isSameOrAfter(nowMoment)
    const isBeforeTwoDays = moment(date).isSameOrBefore(twoDaysFromNow)
    return hasBeginningDatetime && isBeforeTwoDays && isAfterNow
  })
  return results
}

export const filterBookingsInMoreThanTwoDaysOrPast = (
  allBookings,
  momentNowMock
) => {
  const nowMoment = momentNowMock || moment()
  const twoDaysFromNow = nowMoment.clone().add(2, 'days')
  const filtered = allBookings.filter(booking => {
    const date = get(booking, 'stock.eventOccurrence.beginningDatetime')
    const hasBeginningDatetime = Boolean(date)
    const isBeforeNow = moment(date).isBefore(nowMoment)
    const isAfterTwoDays = moment(date).isAfter(twoDaysFromNow)
    return !hasBeginningDatetime || isAfterTwoDays || isBeforeNow
  })
  return filtered
}

export const selectBookings = createSelector(
  state => state.data.bookings,
  allBookings => allBookings
)

export const selectSoonBookings = createSelector(
  state => state.data.bookings,
  allBookings => {
    const filtered = allBookings.filter(filterValidBookings)
    return filterBookingsInLessThanTwoDays(filtered)
  }
)

export const selectOtherBookings = createSelector(
  state => state.data.bookings,
  allBookings => {
    const filtered = allBookings.filter(filterValidBookings)
    return filterBookingsInMoreThanTwoDaysOrPast(filtered)
  }
)

export const selectBookingById = createSelector(
  state => state.data.bookings,
  (state, bookingId) => bookingId,
  (bookings, bookingId) => bookings.find(o => o.id === bookingId)
)

export default selectBookings
