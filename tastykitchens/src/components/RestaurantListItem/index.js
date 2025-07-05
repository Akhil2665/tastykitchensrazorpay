import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const RestaurantListItem = props => {
  const {restaurantDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = restaurantDetails
  const {rating, totalReviews} = userRating

  return (
    <>
      <Link to={`/restaurant/${id}`} className="link-item">
        <li className="restaurant-list-item">
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />
          <div className="restaurant-details-container">
            <h1 className="restaurant-name">{name}</h1>
            <p className="cuisine">{cuisine}</p>
            <div className="rating-container">
              <FaStar className="rating-icon" />
              <p className="rating">{rating} </p>
              <h1 className="rating-count">({totalReviews} ratings)</h1>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default RestaurantListItem
