import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {IoMenuOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoMdCloseCircleOutline} from 'react-icons/io'

import 'reactjs-popup/dist/index.css'

import './index.css'

class Header extends Component {
  state = {
    cart: [],
  }

  onClikedLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  navContainer = () => (
    <nav className="nav-container">
      <ul className="nav-list">
        <Link to="/" className="nav-link">
          <li className="nav-item" key="HOME">
            Home
          </li>
        </Link>
        <Link to="/cart" className="nav-link">
          <li className="nav-item" key="CART">
            Cart
          </li>
        </Link>
        <li className="nav-item" key="DESKLOGOUT">
          <button
            type="button"
            onClick={this.onClikedLogout}
            className="logout-button"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )

  render() {
    const {cart} = this.state
    const storedCartList = JSON.parse(localStorage.getItem('cartData')) || []
    const cartLength = storedCartList.length
    // console.log(cartLength, cart, 'cartlength')
    const overlayStyles = {
      backgroundColor: '#ffff',
      width: '100%',
      position: 'absolute',
      height: '40px',
      marginTop: '110px',
    }

    return (
      <>
        <div className="header">
          <div className="logo-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dak8sudez/image/upload/v1741532996/Frame_274_r9hgm0.jpg"
                className="web-logo"
                alt="website logo"
              />
            </Link>
            <h1 className="logo-heading">Tasty Kitchens</h1>
          </div>
          {this.navContainer()}
        </div>
        <div className="mobile-navbar">
          <div className="logo-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dak8sudez/image/upload/v1741532996/Frame_274_r9hgm0.jpg"
                className="web-logo"
                alt="website logo"
              />
            </Link>
            <h1 className="logo-heading">Tasty Kitchens</h1>
          </div>

          <div className="popup-container">
            <Popup
              modal
              overlayStyle={overlayStyles}
              position="top center"
              trigger={
                <button type="button" className="trigger-button">
                  <IoMenuOutline className="menu-icon" />
                </button>
              }
            >
              {close => (
                <>
                  <div className="mobile-popup-header-container">
                    <nav className="nav-container">
                      {this.navContainer()}
                      <button
                        className="close-icon-btn"
                        type="button"
                        onClick={() => close()}
                      >
                        <IoMdCloseCircleOutline className="menu-icon" />
                      </button>
                    </nav>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Header)
