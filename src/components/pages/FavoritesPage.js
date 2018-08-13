import PropTypes from 'prop-types'
import { requestData } from 'pass-culture-shared'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Main from '../layout/Main'
import Footer from '../layout/Footer'
import BookingItem from '../BookingItem'

const getkey = index => `booking-item-${index}`

const renderPageHeader = () => (
  <header>
    <h1>
      {'Mes favoris'}
    </h1>
  </header>
)

const renderPageFooter = () => {
  const footerProps = { borderTop: true }
  return <Footer {...footerProps} />
}

const FavoritesPage = ({ favorites }) => (
  <Main
    name="favorites"
    redBg
    backButton
    footer={renderPageFooter}
    header={renderPageHeader}
  >
    {favorites.length > 0 && (
      <div>
        <ul className="favorites">
          {favorites.map((b, index) => (
            // FIXME -> react/no-array-index-key
            // il faut plutot s'appuyer sur l'id d'un booking
            // https://reactjs.org/docs/lists-and-keys.html#keys
            <BookingItem key={getkey(index)} {...b} />
          ))}
        </ul>
      </div>
    )}
    {favorites.length === 0 && (
      <div>
        <p className="nothing">
Pas encore de favoris.
        </p>
        <p className="nothing">
          <Link to="/decouverte" className="button is-primary">
            Allez-y !
          </Link>
        </p>
      </div>
    )}
  </Main>
)

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
}

export default connect(
  state => ({
    favorites: state.data.favorites || [],
  }),
  { requestData }
)(FavoritesPage)
