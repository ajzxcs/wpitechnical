import { Image } from "./image";
import React from "react";

import { getAllGallery } from '../Features/firebase/Storage'


export const Gallery = (props) => {

  const [gallery, setGallery] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const urls = await getAllGallery();
      setGallery(urls);

    };

    if (isMounted) {
      loadImages();
    }

    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
            Post and Blogs Campaign
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {gallery
              ? gallery?.map((data, index) => (
                  <div
                    key={index}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={data.name}
                      largeImage={data.url}
                      smallImage={data.url}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
