import {Component} from 'react'

import {FaStar, FaRupeeSign} from 'react-icons/fa'

// import FoodItemCounter from '../FoodItemCounter'
// import CartContext from '../../context/CartContext'

import './index.css'

class FoodItem extends Component {
  state = {
    quantityVal: 0,
  }

  updateLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  addCartItem = product => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []

    const existingProduct = cartList?.find(
      eachItem => eachItem.id === product.id,
    )
    if (existingProduct) {
      const updateQuantityCartList = cartList?.map(eachItem =>
        eachItem.id === product.id
          ? {...eachItem, quantity: eachItem.quantity + product.quantity}
          : eachItem,
      )
      localStorage.setItem('cartData', JSON.stringify(updateQuantityCartList))
    } else {
      const updatedCartList = [...cartList, product] || [{...product}]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  decrementCartItemQuantity = id => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []

    const updatedList = cartList?.map(eachItem =>
      eachItem.id === id && eachItem.quantity >= 1
        ? {...eachItem, quantity: eachItem.quantity - 1}
        : eachItem,
    )
    const filterdList = updatedList?.filter(eachItem => eachItem.quantity !== 0)

    localStorage.setItem('cartData', JSON.stringify(filterdList))
  }

  incrementCartItemQuantity = id => {
    // console.log('increment quant')
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []

    const updatedList = cartList?.map(eachItem =>
      eachItem.id === id
        ? {...eachItem, quantity: eachItem.quantity + 1}
        : eachItem,
    )

    localStorage.setItem('cartData', JSON.stringify(updatedList))
  }

  onChangeQunatity = () => {
    const {foodItemDetails} = this.props
    this.setState({quantityVal: 1})
    this.addCartItem({...foodItemDetails, quantity: 1})
  }

  onClickedDecrement = () => {
    const {foodItemDetails} = this.props
    const {id} = foodItemDetails
    this.setState(prevState => ({quantityVal: prevState.quantityVal - 1}))
    this.decrementCartItemQuantity(id)
  }

  onClickedIncrement = () => {
    const {foodItemDetails} = this.props
    const {id} = foodItemDetails
    this.setState(prevState => ({quantityVal: prevState.quantityVal + 1}))
    this.incrementCartItemQuantity(id)
  }

  renderAddButton = () => {
    const {quantityVal} = this.state
    return quantityVal > 0 ? (
      <div className="food-item-counter">
        <button
          type="button"
          onClick={this.onClickedDecrement}
          className="cart-quantity-btn"
        >
          -
        </button>
        <p className="count-value">{quantityVal}</p>
        <button
          type="button"
          onClick={this.onClickedIncrement}
          className="cart-quantity-btn"
        >
          +
        </button>
      </div>
    ) : (
      <button className="add-btn" type="button" onClick={this.onChangeQunatity}>
        Add
      </button>
    )
  }

  render() {
    const {foodItemDetails} = this.props
    const {imageUrl, name, cost, rating} = foodItemDetails
    return (
      <li className="food-list-item">
        <img src={imageUrl} className="food-image" alt={name} />
        <div className="food-item-details">
          <h1 className="food-name">{name}</h1>
          <p className="cost">
            <FaRupeeSign /> {cost}
          </p>
          <p className="rating">
            <FaStar className="food-star-icon" />
            {rating}
          </p>
          {this.renderAddButton()}
        </div>
      </li>
    )
  }
}

export default FoodItem
