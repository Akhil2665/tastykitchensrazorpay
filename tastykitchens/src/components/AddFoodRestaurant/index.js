import {FaStar, FaRupeeSign} from 'react-icons/fa'

import './index.css'

const AddFoodRestaurant = props => {
  const {restaurantDetails} = props

  const {
    imageUrl,
    costForTwo,
    cuisine,
    location,
    name,
    rating,
    reviewsCount,
    id,
  } = restaurantDetails

  return (
    <>
      <div className="restaurant-full-details-card">
        <img
          src={imageUrl}
          className="restaurant-full-image"
          alt="restaurant"
        />
        <div className="restaurant-full-details">
          <h1 className="restro-name">{name}</h1>
          <p className="special-cuisine">{cuisine}</p>
          <p className="location">{location}</p>
          <div className="rating-and-price">
            <div className="restaurant-rating-details">
              <div className="restaurant-rating-container">
                <FaStar className="restaurant-rating-icon" />
                <p className="restro-rating">{rating}</p>
              </div>
              <p className="total-ratings">{reviewsCount}+ ratings</p>
            </div>
            <div className="restaurant-price-details">
              <p className="starting-price">
                <FaRupeeSign />
                {costForTwo}
              </p>
              <p className="cost-for-two">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddFoodRestaurant
