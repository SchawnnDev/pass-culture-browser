import React from 'react'
import { shallow } from 'enzyme'

import { RawVersoWrapper } from '../VersoWrapper'

const dispatchMakeDraggableMock = jest.fn()
const dispatchMakeUndraggableMock = jest.fn()

describe('src | components | verso | RawVersoWrapper', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const props = {
        areDetailsVisible: true,
        children: jest.mock(),
        className: 'className',
        dispatchMakeDraggable: dispatchMakeDraggableMock,
        dispatchMakeUndraggable: dispatchMakeUndraggableMock,
        draggable: true,
      }

      // when
      const wrapper = shallow(
        <RawVersoWrapper {...props}>
          <div id="fake-required-child-element" />
        </RawVersoWrapper>
      )

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('render', () => {
    describe('Background Color', () => {
      describe('When no color given in recommendation', () => {
        it('should render black by default', () => {
          // given
          const props = {
            areDetailsVisible: true,
            children: jest.mock(),
            className: 'className',
            dispatchMakeDraggable: dispatchMakeDraggableMock,
            dispatchMakeUndraggable: dispatchMakeUndraggableMock,
            draggable: true,
          }

          // when
          const wrapper = shallow(
            <RawVersoWrapper {...props}>
              <div id="fake-required-child-element" />
            </RawVersoWrapper>
          )
          const header = wrapper.find('.verso-header')

          // then
          expect(header.props().style.backgroundColor).toEqual('black')
        })
      })
      describe('With a color given in recommendation', () => {
        it('should render associate color', () => {
          // given
          const props = {
            areDetailsVisible: true,
            children: jest.mock(),
            className: 'className',
            currentRecommendation: {
              firstThumbDominantColor: [56, 28, 45],
            },
            dispatchMakeDraggable: dispatchMakeDraggableMock,
            dispatchMakeUndraggable: dispatchMakeUndraggableMock,
            draggable: true,
          }

          // when
          const wrapper = shallow(
            <RawVersoWrapper {...props}>
              <div id="fake-required-child-element" />
            </RawVersoWrapper>
          )
          const header = wrapper.find('.verso-header')

          // then
          expect(header.props().style.backgroundColor).toEqual(
            'hsl(324, 100%, 7.5%)'
          )
        })
      })
    })
  })
})
