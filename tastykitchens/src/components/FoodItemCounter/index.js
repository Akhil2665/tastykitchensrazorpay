// import CartContext from '../../context/CartContext'

import './index.css'

const FoodItemCounter = props => {
  const {onClickedIncrement, onClickedDecrement, quantity} = props
  const onIncrement = () => onClickedIncrement()
  const onDecrement = () => onClickedDecrement()

  return (
    <div className="counter">
      <button type="button" onClick={onDecrement}>
        -
      </button>
      <div className="count-value">{quantity}</div>
      <button type="button" onClick={onIncrement}>
        +
      </button>
    </div>
  )
}

export default FoodItemCounter
