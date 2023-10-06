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

  const handleImageClick = (url) => {
    window.open("https://wellnessproinc.com/", "_blank"); // Open YouTube in a new tab/window
  };

  return (
    <div id="brand" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Brands</h2>
        </div>
        <div className="row">
          {brands ? (
            <Carousel
              showArrows={true}
              autoPlay={true}
              interval={2000}
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              showIndicators={true}
              style={{ maxWidth: "100%", margin: "0 auto" }}
              ref={carouselRef}
            >
              {brands?.map((url, index) => (
                <div key={`${url.name}-${index}`} onClick={() => handleImageClick(url)}>
                  <img
                    src={url.url}
                    alt={url.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      maxHeight: "300px",
                      cursor: "pointer", // Add a pointer cursor to indicate clickability
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
