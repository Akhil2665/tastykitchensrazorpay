import {Link, useParams, useLocation} from 'react-router-dom'

// import Header from '../Header'

import './index.css'

const PaymentSuccessful = () => {
  console.log('PaymentSuccessful')
  // const {orderId, paymentId, signature} = useParams()
  // console.log(orderId, paymentId, signature, 'orderId, paymentId, signature')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const orderId = queryParams.get('orderref')
  const paymentId = queryParams.get('paymentref')

  // const history = useHistory()
  return (
    <>
      <div className="payment-successful-container">
        <img
          src="https://res.cloudinary.com/dak8sudez/image/upload/v1741601734/Vector_zhuanw.png"
          className="payment-successful-image"
          alt="success"
        />
        <h1 className="payment-successful-heading">Payment Successful</h1>
        <p className="payment-successful-about">
          Thank you for ordering Your payment is successfully completed
          <br />
          with the order ID: {orderId}, <br /> payment ID: {paymentId} --
          Tastykitchenss
        </p>
        <Link to="/" className="link-item">
          <p className="payment-home-page-btn">Go To Home Page</p>
        </Link>
      </div>
    </>
  )
}

export default PaymentSuccessful
