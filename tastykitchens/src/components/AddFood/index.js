import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import FoodItem from '../FoodItem'
import AddFoodRestaurant from '../AddFoodRestaurant'
import Footer from '../Footer'
import Header from '../Header'
// import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// const cartData = JSON.parse(localStorage.getItem('cartData')) || []

class AddFood extends Component {
  state = {
    foodItemsList: [],
    restaurantData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getFoodItems()
  }

  getFoodItems = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {restaurantId} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${restaurantId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const getUpdatedData = restaurantResponseData => ({
        costForTwo: restaurantResponseData.cost_for_two,
        cuisine: restaurantResponseData.cuisine,
        id: restaurantResponseData.id,
        imageUrl: restaurantResponseData.image_url,
        location: restaurantResponseData.location,
        name: restaurantResponseData.name,
        rating: restaurantResponseData.rating,
        reviewsCount: restaurantResponseData.reviews_count,
        foodItems: restaurantResponseData.food_items,
      })
      const updatedData = getUpdatedData(data)
      const updatedFoodItemsData = updatedData.foodItems.map(eachObj => ({
        cost: eachObj.cost,
        foodType: eachObj.food_type,
        imageUrl: eachObj.image_url,
        id: eachObj.id,
        name: eachObj.name,
        rating: eachObj.rating,
        quantity: 0,
      }))
      this.setState({
        foodItemsList: updatedFoodItemsData,
        restaurantData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderResult = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderProductsListView = () => {
    const {foodItemsList, restaurantData} = this.state
    return (
      <>
        <Header />
        <div className="add-food-container">
          {restaurantData !== undefined && (
            <AddFoodRestaurant restaurantDetails={restaurantData} />
          )}
          <ul className="food-items-list">
            {foodItemsList?.map(eachItem => (
              <FoodItem foodItemDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
          <Footer />
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <div className="restaurant-food-menu-page-container">
          {this.renderResult(apiStatus)}
        </div>
      </>
    )
  }
}

export default AddFood

// const isItemPresentedInCart = id => {
//             const filterObjects = cartList.filter(
//               eachItem => eachItem.id === id,
//             )
//             return filterObjects
//           }

//           console.log(isItemPresentedInCart(), 'founded')
//           debugger
//           const filteredFoodList = foodItemsList?.map(eachObj => {
//             const isItemPresent = isItemPresentedInCart(eachObj.id)

//             return isItemPresent ? {...isItemPresentedInCart[0]} : {...eachObj}
//           })
//           console.log(filteredFoodList, 'filteredFoodList')
