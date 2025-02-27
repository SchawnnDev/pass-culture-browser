import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

const duration = 500

const defaultStyle = {
  opacity: 0,
  transition: `opacity ${duration}ms ease`,
}

const transitionStyles = {
  entered: { opacity: 1 },
  entering: { opacity: 0 },
  exited: { display: 'none', visibility: 'none' },
}

const Overlay = ({ isVisible }) => (
  <Transition in={isVisible} timeout={!isVisible ? duration : 0}>
    {state => (
      <div
        id="overlay"
        className="is-overlay"
        style={{ ...defaultStyle, ...transitionStyles[state] }}
      />
    )}
  </Transition>
)

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ overlay, share }) => ({
  isVisible: overlay || share.visible,
})

export default connect(mapStateToProps)(Overlay)
