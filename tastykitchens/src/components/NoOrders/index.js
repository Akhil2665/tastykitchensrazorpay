import {Link} from 'react-router-dom'

import './index.css'

const NoOrders = () => (
  <div className="no-orders-container">
    <img
      src="https://res.cloudinary.com/dak8sudez/image/upload/v1741603507/OBJECTS_idstm7.png"
      className="no-orders-image"
      alt="empty cart"
    />
    <h1 className="no-orders-heading">No Order Yet!</h1>
    <p className="no-orders-about">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" style={{textDecoration: 'none'}}>
      <button className="home-page-btn" type="button">
        Order now
      </button>
    </Link>
  </div>
)

export default NoOrders
