import React from 'react'
import { shallow } from 'enzyme'
import { Switch } from 'react-router-dom'

import BackButton from '../../../layout/BackButton'
import RawSearch from '../RawSearch'

// const getDetailsRoute = wrapper =>
//  wrapper.find({ path: "/recherche/resultats/:option?/item/:offerId([A-Z0-9]+)/:mediationId([A-Z0-9]+)?" })
//         .props()
//         .render()

const getPageContentRoute = wrapper =>
  wrapper
    .find({ path: '/recherche/(resultats)?/:option?/:subOption(menu)?' })
    .props()
    .render()

const getPageContentDiv = wrapper =>
  getPageContentRoute(wrapper).props.children.find(child =>
    child.props.className.includes('page-content')
  )

const getPageContentForm = wrapper =>
  getPageContentDiv(wrapper).props.children.find(child => child.type === 'form')

const getPageContentFilter = wrapper =>
  getPageContentDiv(wrapper).props.children.find(
    child => child.props.onKeywordsEraseClick
  )

const getPageContentSwitch = wrapper =>
  getPageContentDiv(wrapper).props.children.find(child => child.type === Switch)

const getSwitchedPageContent = path => wrapper =>
  getPageContentSwitch(wrapper)
    .props.children.find(child => child.props.path === path)
    .props.render()

const getSearchResults = wrapper =>
  getSwitchedPageContent('/recherche/resultats/:menu(menu)?')(wrapper)

const getSearchResultsFromCategory = wrapper =>
  getSwitchedPageContent(
    '/recherche/resultats/:categorie([A-Z][a-z]+)/:menu(menu)?'
  )(wrapper).props.children[1]

const getKeywordsInput = wrapper =>
  getPageContentForm(wrapper)
    .props.children.props.children.find(
      child => child.props.id === 'search-page-keywords-field'
    )
    .props.children[0].props.children.find(
      child => child.props.id === 'keywords'
    )

const getRefreshKeywordsButton = wrapper =>
  getPageContentForm(wrapper).props.children.props.children.find(
    child => child.props.id === 'search-page-keywords-field'
  ).props.children[0].props.children[1].props.children

const getFilterToggle = wrapper =>
  getPageContentForm(wrapper).props.children.props.children.find(
    child => child.props.id === 'search-filter-menu-toggle-button'
  ).props.children

describe('src | components | pages | RawSearch', () => {
  // Initializing Mocks
  const dispatchMock = jest.fn()
  const queryChangeMock = jest.fn()
  const historyMock = { push: jest.fn() }

  const baseInitialProps = {
    dispatch: dispatchMock,
    history: historyMock,
    location: {
      hash: '',
      key: 'lxn6vp',
      pathname: '/recherche',
      search: '?orderBy=offer.id+desc',
      state: undefined,
    },
    match: {
      params: {
        option: undefined,
        subOption: undefined,
        view: undefined,
      },
    },
    query: {
      change: queryChangeMock,
      parse: () => ({ page: '1' }),
    },
    recommendations: [],
    search: {},
    typeSublabels: [],
    typeSublabelsAndDescription: [],
  }

  describe('snapshot', () => {
    it('should match snapshot', () => {
      // when
      const wrapper = shallow(<RawSearch {...baseInitialProps} />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Switch Route', () => {
    describe('on the /recherche page', () => {
      // given
      const wrapper = shallow(<RawSearch {...baseInitialProps} />)

      it('should render the page title', () => {
        expect(wrapper.find('Header').props().title).toEqual('Recherche')
      })

      it('submitButton form is disabled', () => {
        // when
        const button = getPageContentForm(
          wrapper
        ).props.children.props.children.find(
          child => child.props.id === 'search-page-keywords-field'
        ).props.children[1].props.children
        // then
        expect(button.props.disabled).toEqual(true)
      })

      it('filter should be invisible', () => {
        // when
        const searchFilterComponent = getPageContentFilter(wrapper)
        // then
        expect(searchFilterComponent.props.isVisible).toEqual(false)
      })

      it('filter shoud be visible when state isFilterVisible is set to true ', () => {
        // when
        const wrapperInstance = wrapper.instance()
        wrapperInstance.setState({ isFilterVisible: true })
        const searchFilterComponent = getPageContentFilter(wrapper)

        // then
        expect(searchFilterComponent.props.isVisible).toEqual(true)
      })

      it('NavByOfferType with path="/recherche"', () => {
        // when
        const NavByOfferTypeComponent = getSwitchedPageContent(
          '/recherche/:menu(menu)?'
        )(wrapper)

        // then
        expect(NavByOfferTypeComponent.props.title).toEqual('PAR CATÉGORIES')
      })
    })

    describe('On /recherche/resultats page', () => {
      describe('On /recherche/resultats precisely', () => {
        // given
        const initialProps = Object.assign({}, baseInitialProps)
        initialProps.location = Object.assign({}, baseInitialProps.location, {
          pathname: '/recherche/resultats',
        })
        const wrapper = shallow(<RawSearch {...initialProps} />)

        it('should render the page title', () => {
          expect(wrapper.find('Header').props().title).toEqual(
            'Recherche : résultats'
          )
        })

        it('SearchResults with path="/recherche/resultats"', () => {
          // when
          const SearchResults = getSearchResults(wrapper)

          // then
          expect(SearchResults.props.cameFromOfferTypesPage).toEqual(false)
        })
      })

      describe('On /recherche/resultats/:categorie page', () => {
        // given
        const initialProps = Object.assign({}, baseInitialProps)
        initialProps.location = Object.assign({}, baseInitialProps.location, {
          pathname: '/recherche/resultats/Jouer',
        })
        initialProps.match = Object.assign({}, baseInitialProps.params, {
          params: Object.assign({}, baseInitialProps.match.params, {
            option: 'Jouer',
          }),
        })
        initialProps.query = Object.assign({}, baseInitialProps.query, {
          parse: () => ({
            categories: 'Jouer',
            'mots-cles': 'Fake',
          }),
        })
        initialProps.typeSublabelsAndDescription = [
          {
            description:
              'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
            sublabel: 'Jouer',
          },
        ]
        const wrapper = shallow(<RawSearch {...initialProps} />)

        it('NavResultsHeader & SearchResults with path="/recherche/resultats/:categorie"', () => {
          // when
          const ResultsRoute = getSwitchedPageContent(
            '/recherche/resultats/:categorie([A-Z][a-z]+)/:menu(menu)?'
          )(wrapper)
          const NavResultsHeader = ResultsRoute.props.children[0]
          const SearchResults = getSearchResultsFromCategory(wrapper)

          // then
          expect(NavResultsHeader.props.category).toEqual('Jouer')
          expect(NavResultsHeader.props.description).toEqual(
            'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?'
          )
          expect(SearchResults.props.keywords).toEqual('Fake')
          expect(SearchResults.props.cameFromOfferTypesPage).toEqual(true)
        })
      })
    })
  })

  describe('functions', () => {
    describe('constructor', () => {
      it('should initialize state correctly', () => {
        // given
        const initialProps = Object.assign({}, baseInitialProps)
        initialProps.query = Object.assign({}, baseInitialProps.query, {
          parse: () => ({ 'mots-cles': 'Fake' }),
        })

        // when
        const wrapper = shallow(<RawSearch {...initialProps} />)
        const expected = {
          hasMore: false,
          isFilterVisible: false,
          keywordsKey: 0,
          keywordsValue: 'Fake',
        }

        // then
        expect(wrapper.state()).toEqual(expected)
      })
    })

    describe('handleDataRequest', () => {
      describe('On resultats page', () => {
        it('should dispatch requestDataTypes when component is rendered', () => {
          // when
          const wrapper = shallow(<RawSearch {...baseInitialProps} />)
          wrapper.instance().componentDidMount()
          const expectedRequestedGetTypes = {
            config: {
              apiPath: '/types',
              method: 'GET',
            },
            type: 'REQUEST_DATA_GET_/TYPES',
          }

          // THEN
          expect(dispatchMock.mock.calls[1][0]).toEqual(
            expectedRequestedGetTypes
          )
        })
      })
    })

    describe('loadMoreHandler', () => {
      // given
      xit('should call handleDataRequest to request more offers', () => {
        // const handleDataRequestInstanceFc = wrapper.instance().handleDataRequest()
        // jest.mock(handleDataRequestInstanceFc)
        // const spy = jest.spyOn(wrapper.instance(), 'handleDataRequest')
        // when
      })
      xit('should change history location', () => {
        // given
        const initialProps = Object.assign({}, baseInitialProps)
        initialProps.query = Object.assign(baseInitialProps.query, {
          parse: () => ({
            categories: 'Jouer',
            orderBy: 'offer.id+desc',
            page: '1',
          }),
        })

        // when
        const wrapper = shallow(<RawSearch {...initialProps} />)
        wrapper.instance().loadMoreHandler()
        const expected =
          '/recherche?page=2&categories=Jouer&orderBy=offer.id+desc'

        // then
        expect(historyMock.push).toHaveBeenCalledWith(expected)
      })
    })

    describe('onBackToSearchHome', () => {
      describe('On results page', () => {
        // given
        const initialProps = Object.assign({}, baseInitialProps)
        initialProps.location = Object.assign({}, baseInitialProps.location, {
          pathname: '/recherche/resultats',
        })

        it('should update state', () => {
          // when
          const wrapper = shallow(<RawSearch {...initialProps} />)
          wrapper
            .find(BackButton)
            .props()
            .onClick()

          const expected = {
            hasMore: false,
            isFilterVisible: false,
            keywordsKey: 1,
            keywordsValue: '',
          }

          // then
          expect(wrapper.state()).toEqual(expected)
        })

        it('should change query', () => {
          // when
          const wrapper = shallow(<RawSearch {...initialProps} />)
          wrapper
            .find(BackButton)
            .props()
            .onClick()

          const argument1 = {
            categories: null,
            date: null,
            distance: null,
            jours: null,
            latitude: null,
            longitude: null,
            'mots-cles': null,
            page: null,
          }
          const argument2 = { pathname: '/recherche' }

          // then
          expect(queryChangeMock).toHaveBeenCalledWith(argument1, argument2)
          queryChangeMock.mockClear()
        })
      })

      describe('Not on results page', () => {
        it('should not display back button', () => {
          // when
          const wrapper = shallow(<RawSearch {...baseInitialProps} />)

          // then
          expect(wrapper.contains('.back-button')).toEqual(false)
        })
      })
    })

    describe('onSubmit', () => {
      // when
      const wrapper = shallow(<RawSearch {...baseInitialProps} />)
      const event = Object.assign(jest.fn(), {
        preventDefault: () => {},
        target: {
          elements: {
            keywords: {
              value: 'AnyWord',
            },
          },
        },
      })
      const wrapperInstance = wrapper.instance()
      wrapperInstance.setState({ isFilterVisible: true })
      describe('when keywords is not an empty string', () => {
        it('should update state with mots-clés set to value given', () => {
          // when
          wrapperInstance.onSubmit(event)

          const expected = {
            hasMore: false,
            isFilterVisible: false,
            keywordsKey: 0,
            keywordsValue: undefined,
          }

          // then
          expect(wrapper.state()).toEqual(expected)
        })
        it('should change query', () => {
          // when
          wrapperInstance.onSubmit(event)

          const argument1 = {
            'mots-cles': 'AnyWord',
            page: null,
          }
          const argument2 = {
            pathname: '/recherche/resultats',
          }

          // then
          expect(queryChangeMock).toHaveBeenCalledWith(argument1, argument2)
          queryChangeMock.mockClear()
        })
      })

      describe('when keywords is an empty string', () => {
        it('should change query with mots-clés setted to null', () => {
          // given
          const eventEmptyWord = Object.assign(jest.fn(), {
            preventDefault: () => {},
            target: {
              elements: {
                keywords: {
                  value: '',
                },
              },
            },
          })

          // when
          wrapperInstance.onSubmit(eventEmptyWord)

          // then
          const argument1 = {
            'mots-cles': null,
            page: null,
          }
          const argument2 = {
            pathname: '/recherche/resultats',
          }

          // then
          expect(queryChangeMock).toHaveBeenCalledWith(argument1, argument2)
          queryChangeMock.mockClear()
        })
      })
    })

    describe('onKeywoFilterByDates.spec.jsrdsEraseClick', () => {
      describe('when no char has been typed', () => {
        it('button should not appear', () => {
          // when
          const wrapper = shallow(<RawSearch {...baseInitialProps} />)
          const button = wrapper.find('form').find('#refresh-keywords-button')

          // then
          expect(button).not.toHaveProperty('onClick')
        })
      })

      describe('when one char has been typed', () => {
        const wrapper = shallow(<RawSearch {...baseInitialProps} />)
        const wrapperInstance = wrapper.instance()
        wrapperInstance.setState({ keywordsValue: 'A' })

        it('should update state', () => {
          // when
          const button = getRefreshKeywordsButton(wrapper)
          button.props.onClick()

          const expected = {
            hasMore: false,
            isFilterVisible: false,
            keywordsKey: 1,
            keywordsValue: '',
          }
          // then
          expect(wrapper.state()).toEqual(expected)
        })
        it('should change navigation', () => {
          wrapperInstance.setState({ keywordsValue: 'A' })
          const button = getRefreshKeywordsButton(wrapper)
          button.props.onClick()

          // then
          expect(wrapperInstance.state.keywordsValue).toEqual('')
          queryChangeMock.mockClear()
        })
      })
    })

    describe('onKeywordsChange', () => {
      // when
      const wrapper = shallow(<RawSearch {...baseInitialProps} />)
      const event = {
        target: {
          value: 'Any',
        },
      }

      const wrapperInstance = wrapper.instance()
      wrapperInstance.setState({ isFilterVisible: true })

      it('should update state with keywords value', () => {
        // when
        getKeywordsInput(wrapper).props.onChange(event)

        // then
        const expected = {
          hasMore: false,
          isFilterVisible: true,
          keywordsKey: 0,
          keywordsValue: 'Any',
        }

        // then
        expect(wrapper.state()).toEqual(expected)
      })
    })

    describe('onClickOpenCloseFilterDiv', () => {
      describe('When user does not click on the icon button', () => {
        // when
        const wrapper = shallow(<RawSearch {...baseInitialProps} />)

        const filterToggleIcon = getFilterToggle(wrapper).props.children

        it('should show ico-filter', () => {
          expect(filterToggleIcon.props.svg).toEqual('ico-filter')
        })

        it('isFilterVisible state is false', () => {
          const expected = {
            hasMore: false,
            isFilterVisible: false,
            keywordsKey: 0,
            keywordsValue: undefined,
          }

          // then
          expect(filterToggleIcon.props.svg).toEqual('ico-filter')
          expect(wrapper.state()).toEqual(expected)
        })
      })

      describe('When user click on the icon button', () => {
        // when
        const wrapper = shallow(<RawSearch {...baseInitialProps} />)
        const filterToggle = getFilterToggle(wrapper)
        filterToggle.props.onClick(true)
        const filterToggleIcon = getFilterToggle(wrapper).props.children

        it('should update isFilterVisible state to true', () => {
          const expected = {
            hasMore: false,
            isFilterVisible: true,
            keywordsKey: 0,
            keywordsValue: undefined,
          }

          // then
          expect(wrapper.state()).toEqual(expected)
        })

        it('should show chevron-up icon', () => {
          expect(filterToggleIcon.props.svg).toEqual('ico-chevron-up')
        })
      })

      describe('When there is some filters in search', () => {
        it('should show ico-filter-active icon', () => {
          // given
          const initialProps = Object.assign({}, baseInitialProps)
          initialProps.query.parse = () => ({
            categories: '%C3%89couter,Pratiquer',
            date: '2018-09-25T09:38:20.576Z',
            days: null,
            distance: null,
            jours: '0-1,1-5,5-100000',
            latitude: null,
            longitude: null,
            [`mots-cles`]: null,
            page: '2',
            types: null,
          })

          // when
          const wrapper = shallow(<RawSearch {...initialProps} />)
          const filterToggleIcon = getFilterToggle(wrapper).props.children

          // then
          expect(filterToggleIcon.props.svg).toEqual('ico-filter-active')
        })
      })
    })
  })
})
