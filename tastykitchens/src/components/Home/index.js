import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import {BsFilterLeft} from 'react-icons/bs'

import Reactslick from '../Reactslick'
import RestaurantListItem from '../RestaurantListItem'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  // const [restaurant, setRestaurant] = useState({})
  state = {
    restaurantList: [],
    carousalImagesList: [],
    carousalApiStatus: apiStatusConstants.initial,
    sortByOption: 'Lowest',
    pageNumber: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCarousalImages()
    this.getRestaurantList()
  }

  getCarousalImages = async () => {
    this.setState({
      carousalApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.offers.map(eachImageData => ({
        id: eachImageData.id,
        imageUrl: eachImageData.image_url,
      }))
      this.setState({
        carousalImagesList: updatedData,
        carousalApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        carousalApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSliderView = () => {
    const {carousalApiStatus, carousalImagesList} = this.state
    switch (carousalApiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="home-slider-container">
            <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div className="home-page-slider-container">
            <Reactslick carousalImagesList={carousalImagesList} />
          </div>
        )
      default:
        return null
    }
  }

  getRestaurantList = async () => {
    const {sortByOption, pageNumber} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtTokwn = Cookies.get('jwt_token')
    const limit = 9
    let offset
    if (pageNumber === 1) {
      offset = 0
    } else {
      offset = (pageNumber - 1) * limit
    }

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortByOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtTokwn}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.restaurants.map(eachData => ({
        id: eachData.id,
        imageUrl: eachData.image_url,
        name: eachData.name,
        cuisine: eachData.cuisine,
        userRating: {
          rating: eachData.user_rating.rating,
          totalReviews: eachData.user_rating.total_reviews,
        },
      }))

      // setRestaurantList(updatedData)
      this.setState({
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSortByValue = event => {
    this.setState(
      {
        sortByOption: event.target.value,
      },
      this.getRestaurantList,
    )
  }

  onDecrementPageValue = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber - 1}),
        this.getRestaurantList,
      )
    }
  }

  onIncrementPageValue = () => {
    const {pageNumber} = this.state
    if (pageNumber < 4) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber + 1}),
        this.getRestaurantList,
      )
    }
  }

  // renderFailureView = () => (
  //   <div className="products-error-view-container">
  //     <img
  //       src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
  //       alt="all-products-error"
  //       className="products-failure-img"
  //     />
  //     <h1 className="product-failure-heading-text">
  //       Oops! Something Went Wrong
  //     </h1>
  //     <p className="products-failure-description">
  //       We are having some trouble processing your request. Please try again.
  //     </p>
  //   </div>
  // )

  renderResult = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return null
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
    const {restaurantList} = this.state

    return (
      <>
        <div className="app-container">
          <ul className="restaurant-list-container">
            {restaurantList.map(eachObj => (
              <RestaurantListItem
                restaurantDetails={eachObj}
                key={eachObj.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFilter = () => {
    const {sortByOption} = this.state
    return (
      <div className="filter-bar">
        <h1 className="restaurants-heading">Popular Restaurants</h1>
        <div className="about-and-filter">
          <p className="restaurants-about">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="selector-container">
            <BsFilterLeft size={25} color="#475569" />
            <p className="sort-heading">Sort by </p>
            <select
              className="select-element"
              onChange={this.onChangeSortByValue}
              value={sortByOption}
            >
              {sortByOptions.map(eachOption => (
                <option
                  className="option-element"
                  value={eachOption.value}
                  key={eachOption.id}
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus, pageNumber} = this.state
    const totalPages = 4
    return (
      <>
        <Header />
        <div className="home-page-container">
          {this.renderSliderView()}
          {this.renderFilter()}
          {this.renderResult(apiStatus)}
          <div className="page-selection-container">
            <button
              type="button"
              onClick={this.onDecrementPageValue}
              className="pagination-btn"
            >
              <FaAngleLeft />
            </button>
            <h1 className="page-num-heading">
              <span className="page-number">{pageNumber}</span>
              of {totalPages}
            </h1>
            <button
              type="button"
              onClick={this.onIncrementPageValue}
              className="pagination-btn"
            >
              <FaAngleRight />
            </button>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home

// return (
//   <>
//     <Header />
//     <div className="home-page-content-including-slider">
//       {this.renderSliderView()}
//       {this.sortByRestaurant()}
//       {this.renderDisplayRestaurantsView()}
//       <Counter pageChangeFunction={this.getActivePage} />
//     </div>
//     <Footer />
//   </>
// )
