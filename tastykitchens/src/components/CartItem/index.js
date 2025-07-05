import {MdDeleteOutline} from 'react-icons/md'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartItem = props => {
  // console.log('cart item loogedd')
  const {
    cartItemDetails,
    incrementQuantityWithId,
    decrementQuantityWithId,
    removeCartItem,
  } = props
  const {id, name, imageUrl, cost, quantity} = cartItemDetails

  const onClickedDeleteBtn = () => {
    removeCartItem(id)
  }

  const onIncrement = () => incrementQuantityWithId(id)
  const onDecrement = () => decrementQuantityWithId(id)
  return (
    <>
      <li className="cart-list-item">
        <img src={imageUrl} alt={name} className="cart-item-image" />

        <div className="name-delete-container">
          <div className="cart-item-name-container">
            <h1 className="cart-item-heading">{name} </h1>
            <button
              className="delete-button"
              type="button"
              onClick={onClickedDeleteBtn}
            >
              <MdDeleteOutline className="delete-icon" />
            </button>
          </div>
          <div className="cart-price-quantity-container">
            <div className="counter-container">
              <div className="counter">
                <button
                  type="button"
                  onClick={onDecrement}
                  className="cart-quantity-btn"
                >
                  -
                </button>
                <p className="count-value">{quantity}</p>

                <button
                  type="button"
                  onClick={onIncrement}
                  className="cart-quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            <div className="price-container">
              <BiRupee className="rupee-icon" />
              <p className="item-price">{quantity * cost}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default CartItem
