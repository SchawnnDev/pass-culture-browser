import React, { Component } from 'react'
import { connect } from 'react-redux'

import Sign from '../components/Sign'
import { closeModal, showModal } from '../reducers/modal'

const withLogin = WrappedComponent => {
  class _withLogin extends Component {
    componentWillMount = () => {
<<<<<<< HEAD
      const { user, showModal } = this.props
      !user && showModal(<Sign />)
=======
      // be sure that user is not defined yet
      // by waiting a bit
      setTimeout(() => {
        const { user, showModal } = this.props
        !user && showModal(<Sign />)
      }, 1000)
>>>>>>> origin/automatic-sign
    }
    componentWillReceiveProps = nextProps => {
      if (nextProps.user && nextProps.user !== this.props.user) {
        nextProps.closeModal()
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return connect(
    ({ user }) => ({ user }),
    { closeModal, showModal }
  )(_withLogin)
}

export default withLogin
