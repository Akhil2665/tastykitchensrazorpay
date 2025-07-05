/* global Razorpay */

import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import {BiRupee} from 'react-icons/bi'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'

function Checkout() {
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('knr')
  const [stateProvince, setStateProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [enablePayBtn, setEnablePayBtn] = useState(false)
  const orderItems = JSON.parse(localStorage.getItem('cartData')) || []
  const history = useHistory()

  // console.log(orderItems, 'orderitesm')

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0,
  )
  const shipping = 15.0
  const taxes = 26.8
  const total = subtotal + shipping + taxes

  const handleSubmit = e => {
    e.preventDefault()
    setEnablePayBtn(true)
  }

  const handlePayNow = async () => {
    try {
      const {data: keyData} = await axios.get('/api/v1/getkey')
      const {key} = keyData
      console.log(key, 'razorpay key')
      const {data: orderData} = await axios.post('/api/v1/payment/process', {
        amount: total,
      })
      const {order} = orderData
      console.log(order, 'order data from payment processing')

      const options = {
        key,
        amount: order.amount,
        name: 'Tastykitchens',
        description: 'Tastykitchens Transaction',
        image: 'https://example.com/your_logo',
        order_id: order.id,
        callback_url: '/api/v1/paymentverify',
        prefill: {
          name: 'Gaurav Kumar',
          email: 'akhil@example.com',
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      }
      const rzp = new Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Error fetching Razorpay key:', error)
    }
    // console.log(response, data, 'data from payment processing')
    // if (data.status === 'success') {
    //   console.log('Payment processing successful:', data.order)
    //   history.push('/paymentsuccessful/orderplaced')
    // } else {
    //   console.error('Payment processing failed:', data.error)
    // }
  }

  return (
    <>
      <Header />
      <div className="checkout-container">
        {/* Left Column: Form Fields */}
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <section className="form-group">
              <h2>Contact information</h2>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
                placeholder="Enter your Contact Number"
              />
            </section>

            <section className="form-group">
              <h2>Shipping address</h2>
              <label htmlFor="company">Company (optional)</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Company name"
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                placeholder="Street address"
              />
              <label htmlFor="apartment">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                value={apartment}
                onChange={e => setApartment(e.target.value)}
                placeholder="Apartment, suite, building"
              />
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    placeholder="City"
                  />
                </div>
                <div className="form-column">
                  <label htmlFor="stateProvince">State/Province</label>
                  <input
                    type="text"
                    id="stateProvince"
                    value={stateProvince}
                    onChange={e => setStateProvince(e.target.value)}
                    required
                    placeholder="State or Province"
                  />
                </div>
                <div className="form-column">
                  <label htmlFor="postalCode">Postal code</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    required
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </section>

            {/* Billing Information */}
            <section className="form-group">
              <h2>Billing information</h2>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  checked={sameAsShipping}
                  onChange={e => setSameAsShipping(e.target.checked)}
                />
                <label htmlFor="sameAsShipping">
                  Same as shipping information
                </label>
              </div>
            </section>

            <p className="charge-info">
              You wont be charged until the next step.
            </p>
            <button type="submit" className="continue-button">
              Continue
              {/* <form>
                <script
                  src="https://checkout.razorpay.com/v1/payment-button.js"
                  data-payment_button_id="pl_QcJ3aW3Xz93qjP"
                  async
                >
                  {' '}
                </script>{' '}
              </form> */}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="checkout-summary-section">
          <h2>Order summary</h2>
          <div className="order-items-list">
            {orderItems.map(item => (
              <div key={item.id} className="order-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                </div>
                <div className="item-quantity-container">
                  <p className="qty-heading">
                    Qty {' x '}
                    <span className="item-quantity"> {item.quantity}</span>
                  </p>
                  {/* <p></p> */}
                </div>
                <p className="item-price price">
                  <BiRupee className="price-icon" />
                  {item.cost * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="order-summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="price">
                <BiRupee className="price-icon" />
                {subtotal}
              </span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="price">
                <BiRupee className="price-icon" />
                {shipping.toFixed(2)}
              </span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span className="price">
                <BiRupee className="price-icon" />
                {taxes.toFixed(2)}
              </span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="price">
                <BiRupee className="price-icon" />
                {total.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              className="continue-button"
              onClick={handlePayNow}
              disabled={!enablePayBtn}
              style={{backgroundColor: enablePayBtn ? '#46c54e' : '#ccc'}}
            >
              Pay now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Checkout // Export App as default for Canvas
