// jest --env=jsdom ./src/helpers/tests/getRouterParamByKey --watch
import getRouterParamByKey from '../getRouterParamByKey'

describe('src | helpers | tests | getRouterParamByKey', () => {
  it('returns token if exists', () => {
    // given
    const token = 'AAAA'
    const value = { params: { token } }
    // when
    const result = getRouterParamByKey(value, 'token')
    // then
    expect(result).toStrictEqual(token)
  })

  it('returns token equal to undefined if its value equal null', () => {
    // given
    const value = { params: { token: null } }
    // when
    const result = getRouterParamByKey(value, 'token')
    // then
    expect(result).toStrictEqual(undefined)
  })

  it('returns token equal undefined if its value equal undefined', () => {
    // given
    const value = { params: { token: undefined } }
    // when
    const result = getRouterParamByKey(value, 'token')
    // then
    expect(result).toStrictEqual(undefined)
  })

  it('returns token equal undefined if is not defined', () => {
    // given
    const value = { params: {} }
    // when
    const result = getRouterParamByKey(value, 'token')
    // then
    expect(result).toStrictEqual(undefined)
  })

  it('returns token equal undefined if params is not defined', () => {
    expect(() => {
      // when
      const value = null
      getRouterParamByKey(value)
    }).toThrow()
  })

  it('returns token equal null if match is not defined', () => {
    expect(() => {
      // when
      const key = null
      const value = { location: { params: { token: 'AAAA' } } }
      getRouterParamByKey(value, key)
    }).toThrow()
  })
})
