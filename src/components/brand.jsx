import React, { useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./brand.css";

// firebase
import { getAllImages } from "../Features/firebase/Storage";

export const Brand = (props) => {
  const [brands, setBrands] = React.useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const urls = await getAllImages();
      setBrands(urls);
    };

    if (isMounted) {
      loadImages();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    window.onload = () => {
      const carousel = carouselRef.current;

      if (carousel && !carousel.isPlaying) {
        carousel.startAutoplay();
      }
    };

    return () => {
      window.onload = null;
    };
  }, []);

  return (
    <div id="brand" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Brands</h2>
        </div>
        <div className="row">
          {brands ? (
            <Carousel
              showArrows={false} // Hide the default arrows
              autoPlay={true}
              interval={2000}
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              showIndicators={true} // Show the circle indicators
              style={{ maxWidth: "100%", margin: "0 auto" }} // Set max width and center
              ref={carouselRef} // Add the ref here
            >
              {props.data?.map((url, index) => (
                <div key={`${url.name}-${index}`}>
                  <img
                    src={url.url}
                    alt={url.name}
                    style={{
                      objectFit: "cover",
                      width: "100%", // Make the images full width
                      maxHeight: "300px", // Set the max height for mobile (adjust as needed)
                    }}
                  />
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
