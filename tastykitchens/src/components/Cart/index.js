/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import PaymentSuccessful from '../PaymentSuccessful'
import NoOrders from '../NoOrders'

import './index.css'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

// const initialCartData =

class Cart extends Component {
  state = {
    cartData: JSON.parse(localStorage.getItem('cartData')) || [],
    cartStatus: cartStatusConstants.initial,
  }

  componentDidMount() {
    this.getTheCartData()
  }

  getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('cartData'))

  storeCartDataToLocalStorage = changeInData => {
    localStorage.setItem('cartData', JSON.stringify(changeInData))
  }

  getTheCartData = () => {
    const cartData = this.getDataFromLocalStorage() || []
    if (cartData.length === 0) {
      this.setState({cartStatus: cartStatusConstants.noCartItems})
    } else {
      this.setState({
        cartData,
        cartStatus: cartStatusConstants.cartItemsFound,
      })
    }
  }

  incrementQuantityWithId = uniqueId => {
    const cartData = this.getDataFromLocalStorage()
    const changeInData = cartData.map(eachItem => {
      if (eachItem.id === uniqueId) {
        const quantity = eachItem.quantity + 1
        return {...eachItem, quantity}
      }
      return eachItem
    })
    this.storeCartDataToLocalStorage(changeInData)
    this.getTheCartData()
  }

  decrementQuantityWithId = uniqueId => {
    const cartData = this.getDataFromLocalStorage()
    const changeInData = cartData.map(eachItem => {
      if (eachItem.id === uniqueId) {
        const quantity = eachItem.quantity - 1
        return {...eachItem, quantity}
      }
      return eachItem
    })
    this.storeCartDataToLocalStorage(changeInData)
    this.removeUnNecessaryData()
    this.getTheCartData()
  }

  removeUnNecessaryData = () => {
    const cartData = this.getDataFromLocalStorage() || []
    const filtering = cartData.filter(eachItem => eachItem.quantity >= 1)
    const newCartData = [...filtering]
    this.storeCartDataToLocalStorage(newCartData)
    this.getTheCartData()
  }

  calculateTheTotalAmount = () => {
    const cartData = this.getDataFromLocalStorage() || []
    if (cartData.length > 0) {
      const cartValue = cartData.map(each => each.quantity * each.cost)
      const reduceValue = cartValue.reduce((a, b) => a + b)
      return reduceValue
    }
    return 0
  }

  goToHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  placeOrder = () => {
    // this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    const {history} = this.props
    history.push('/checkout')
    // localStorage.clear('cartData')
  }

  cartEmptyView = () => {
    const {cartData} = this.state

    return <NoOrders />
  }

  removeCartItem = id => {
    const cartData = this.getDataFromLocalStorage() || []
    const updatedList = cartData.filter(eachItem => eachItem.id !== id)
    this.setState({cartData: updatedList}, this.getTheCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedList) || [])
  }

  paymentSuccessfulView = () => <PaymentSuccessful />

  onClickedRemoveAll = () => {
    localStorage.removeItem('cartData')
    this.setState({cartData: []}, this.getTheCartData)
  }

  cartItemsView = () => {
    const cartData = this.getDataFromLocalStorage() || []

    const totalValue = this.calculateTheTotalAmount()
    return (
      <>
        <div className="cart-container">
          <div className="cart-container-to-hold-all-item">
            <div className="remove-all-button-container">
              <button
                type="button"
                onClick={this.onClickedRemoveAll}
                className="remove-all-button"
              >
                Remove all
              </button>
            </div>
            <div className="row-names">
              <h1 className="row-name-item">Item</h1>
              <div className="cart-qunatity-price-container">
                <h1 className="row-name">Quantity</h1>
                <h1 className="row-name-price">Price</h1>
              </div>
            </div>
            <ul className="cart-route-cart-item-un-order-container">
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  cartItemDetails={eachItem}
                  incrementQuantityWithId={this.incrementQuantityWithId}
                  decrementQuantityWithId={this.decrementQuantityWithId}
                  removeCartItem={this.removeCartItem}
                />
              ))}
            </ul>
            <hr className="cart-route-horizontal-line" />
            <div className="cart-value-container">
              <h1 className="cart-route-total-order-value-heading">
                Order Total:
              </h1>
              <div className="cart-route-total-order-value-rupees">
                <BiRupee className="total-price" />
                <p className="total-price">{totalValue}.00</p>
              </div>
            </div>
            <div className="order-now-btn-container">
              <button
                className="order-now-btn"
                type="button"
                onClick={this.placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  onRenderDisplayCartPage = cartStatus => {
    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.cartItemsView()
      case cartStatusConstants.noCartItems:
        return this.cartEmptyView()
      case cartStatusConstants.paymentSuccess:
        return this.paymentSuccessfulView()
      default:
        return null
    }
  }

  render() {
    const {cartStatus} = this.state
    return (
      <>
        <Header />
        <div>{this.onRenderDisplayCartPage(cartStatus)}</div>
      </>
    )
  }
}

export default Cart
