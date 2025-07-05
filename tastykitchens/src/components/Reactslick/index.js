import Slider from 'react-slick'

import './index.css'

const Reactslick = props => {
  const {carousalImagesList} = props
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    dotsClass: 'slick-dots',
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  }

  return (
    <>
      <Slider {...settings}>
        {carousalImagesList.map(eachData => (
          <img
            src={eachData.imageUrl}
            key="carousal-image"
            alt="offer"
            className="carousal-image"
          />
        ))}
      </Slider>
    </>
  )
}

export default Reactslick
