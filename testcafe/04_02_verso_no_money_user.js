// $(yarn bin)/testcafe chrome ./testcafe/04_02_verso.js --watch
import { Selector } from 'testcafe'

import { createUserRole } from './helpers/roles'
import { fetchSandbox } from './helpers/sandboxes'
import { getVersoWallet, getVersoWalletValue } from './helpers/getVersoWallet'
import { ROOT_PATH } from '../src/utils/config'

const thingBaseURL = 'KU/F4'
const discoverURL = `${ROOT_PATH}decouverte`
const offerPage = `${discoverURL}/${thingBaseURL}`

const openVersoButton = Selector('#deck-open-verso-button')

fixture(`04_02 Verso, quand l'user n'a plus d'argent`)

test(`La somme affichée est égale à 0`, async t => {
  // given
  const { user } = await fetchSandbox(
    'webapp_04_verso',
    'get_existing_webapp_hnmm_user'
  )
  // when
  await t
    .useRole(createUserRole(user))
    .navigateTo(offerPage)
    .click(openVersoButton)
    .wait(500)
  // then
  const versoWallet = await getVersoWallet()
  const versoWalletValue = await getVersoWalletValue()
  await t
    .expect(versoWallet)
    .contains('€')
    .expect(versoWalletValue)
    .eql(0)
})
