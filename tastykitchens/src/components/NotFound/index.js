import {Link} from 'react-router-dom'

import './index.css'

function NotFound() {
  return (
    <div className="page-not-found-container">
      <img
        src="https://res.cloudinary.com/dak8sudez/image/upload/v1741603497/erroring_1_y14d0k.png"
        className="not-found"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="page-not-found-about">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/" className="link-not-found">
        <button className="home-page-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
