import card, {
  closeCardDetails,
  flipUnflippable,
  makeDraggable,
  makeUndraggable,
  showCardDetails,
  CLOSE_DETAILS_VIEW,
  MAKE_DRAGGABLE,
  MAKE_UNDRAGGABLE,
  SHOW_UNFLIPPABLE_DETAILS_VIEW,
  SHOW_DETAILS_VIEW,
} from '../card'

describe('src | reducers | card  ', () => {
  const state = []
  it('should return the initial state by default', () => {
    // given
    const action = {}

    // when
    const updatedState = card(state, action)

    // then
    expect(updatedState).toEqual(state)
  })

  describe('When action.type is CLOSE_DETAILS_VIEW', () => {
    it('should return correct update state', () => {
      // given
      const action = { type: CLOSE_DETAILS_VIEW }

      // when
      const queriesReducer = card(state, action)
      const expected = { areDetailsVisible: false, unFlippable: false }

      // then
      expect(queriesReducer).toEqual(expected)
    })
  })

  describe('When action.type is SHOW_DETAILS_VIEW', () => {
    it('should return correct update state', () => {
      // given
      const action = { type: SHOW_DETAILS_VIEW }

      // when
      const queriesReducer = card(state, action)
      const expected = { areDetailsVisible: true }

      // then
      expect(queriesReducer).toEqual(expected)
    })
  })

  describe('When action.type is MAKE_UNDRAGGABLE', () => {
    it('should return correct update state', () => {
      // given
      const action = { type: MAKE_UNDRAGGABLE }

      // when
      const queriesReducer = card(state, action)
      const expected = { draggable: false }

      // then
      expect(queriesReducer).toEqual(expected)
    })
  })

  describe('When action.type is MAKE_DRAGGABLE', () => {
    it('should return correct update state', () => {
      // given
      const action = { type: MAKE_DRAGGABLE }

      // when
      const queriesReducer = card(state, action)
      const expected = { draggable: true }

      // then
      expect(queriesReducer).toEqual(expected)
    })
  })

  describe('When action.type is SHOW_UNFLIPPABLE_DETAILS_VIEW', () => {
    it('should return correct update state', () => {
      // given
      const action = {
        type: SHOW_UNFLIPPABLE_DETAILS_VIEW,
      }

      // when
      const queriesReducer = card(state, action)
      const expected = {
        areDetailsVisible: true,
        unFlippable: true,
      }

      // then
      expect(queriesReducer).toEqual(expected)
    })
  })

  describe('src | actions', () => {
    describe('showCardDetails', () => {
      it('should return correct action type', () => {
        // when
        const action = showCardDetails({})
        const expected = {
          type: SHOW_DETAILS_VIEW,
        }

        // then
        expect(action).toMatchObject(expected)
      })
    })
    describe('flipUnflippable', () => {
      it('should return correct action type', () => {
        // when
        const action = flipUnflippable({})
        const expected = {
          type: SHOW_UNFLIPPABLE_DETAILS_VIEW,
        }

        // then
        expect(action).toMatchObject(expected)
      })
    })

    describe('makeDraggable', () => {
      it('should return correct action type', () => {
        // when
        const action = makeDraggable({})
        const expected = {
          type: MAKE_DRAGGABLE,
        }

        // then
        expect(action).toMatchObject(expected)
      })
    })

    describe('makeUndraggable', () => {
      it('should return correct action type', () => {
        // when
        const action = makeUndraggable({})
        const expected = {
          type: MAKE_UNDRAGGABLE,
        }

        // then
        expect(action).toMatchObject(expected)
      })
    })

    describe('closeCardDetails', () => {
      it('should return correct action type', () => {
        // when
        const action = closeCardDetails({})
        const expected = {
          type: CLOSE_DETAILS_VIEW,
        }

        // then
        expect(action).toMatchObject(expected)
      })
    })
  })
})
