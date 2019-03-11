// $(yarn bin)/testcafe chrome ./testcafe/04_01_verso_user_with_money.js
import { Selector } from 'testcafe'

import { createUserRole } from './helpers/roles'
import { fetchSandbox } from './helpers/sandboxes'
import { getVersoWallet, getVersoWalletValue } from './helpers/getVersoWallet'
import { ROOT_PATH } from '../src/utils/config'

const discoverURL = `${ROOT_PATH}decouverte`
const versoOfferName = Selector('#verso-offer-name')
const versoOfferVenue = Selector('#verso-offer-venue')
const closeVersoButton = Selector('#deck-close-verso-button')
const openVersoButton = Selector('#deck-open-verso-button')
// const alreadyBookedOfferButton = Selector('#verso-already-booked-button')
// const bookingOnlineButton = Selector('#booking-online-booked-button')
// const bookOfferButton = Selector('#verso-booking-button')
// const onlineBookedOfferButton = Selector('#verso-online-booked-button')

fixture(`04 Verso`).beforeEach(async t => {
  // given
  const { offer, user } = await fetchSandbox(
    'webapp_04_verso',
    'get_hbs_user_and_offer_with_defined_name'
  )
  const offerURL = `${discoverURL}/${offer.id}`
  await t.useRole(createUserRole(user)).navigateTo(offerURL)
})

test(`L'user doit pouvoir cliquer sur les chevrons pour ouvrir le verso`, async t => {
  await t
    .wait(3000)
    .expect(openVersoButton.exists)
    .ok()
    .click(openVersoButton)
    .expect(closeVersoButton.exists)
    .ok()
})

test(`La somme affichée est supérieure à 0`, async t => {
  // when
  await t.click(openVersoButton).wait(500)
  // then
  const versoWallet = await getVersoWallet()
  const versoWalletValue = await getVersoWalletValue()
  await t.expect(versoWallet).contains('€')
  await t.expect(versoWalletValue).gte(0)
})

// test.skip(`L'user peut réserver l'Offre`, async t => {
//   await t
//     .click(openVersoButton)
//     .wait(500)
//     .expect(alreadyBookedOfferButton.exists)
//     .notOk()
//     .expect(onlineBookedOfferButton.exists)
//     .ok()
//     .expect(onlineBookedOfferButton.textContent)
//     .eql(`Accéder`)
// })

test('Le titre et le nom du lieu sont affichés', async t => {
  await t
    .click(openVersoButton)
    .expect(versoOfferName.textContent)
    .eql(`Dansons jusqu'en 2030, de Rackham le Vert`)
    .expect(versoOfferVenue.textContent)
    .eql('Le Sous-sol (Offre en ligne)')
})
