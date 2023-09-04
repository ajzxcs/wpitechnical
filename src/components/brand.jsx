import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Brand = (props) => {
  // State to control the current slide
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handlePrevClick = () => {
    // Decrease the current slide index
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextClick = () => {
    // Increase the current slide index
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  return (
    <div id="brand" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Brands</h2>
        </div>
        <div className="row">
          {props.data ? (
            <Carousel
              showArrows={false} // Hide the default arrows
              autoPlay={true}
              interval={3000}
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              selectedItem={currentSlide} // Control the current slide
              renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && (
                  <button onClick={onClickHandler} className="custom-arrow custom-arrow-prev">
                    Previous
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                  <button onClick={onClickHandler} className="custom-arrow custom-arrow-next">
                    Next
                  </button>
                )
              }
            >
              {props.data.map((d, i) => (
                <div key={`${d.title}-${i}`}>
                  <img src={d.image} alt={d.title} style={{ width: '300px', height: '300px' }} />
                </div>
              ))}
            </Carousel>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};
