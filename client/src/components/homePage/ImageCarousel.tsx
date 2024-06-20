import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imageCarouselData, {
  ImageCarouselSchemaItem,
} from "../../data/imageCarouselData";

const ImageCarousel: React.FC = () => {
  const [key, setKey] = useState<number>(0);

  const images: ImageCarouselSchemaItem[] = imageCarouselData();

  useEffect(() => {
    const handleResize = () => {
      // Reinitialize the component key, causing a re-render to better handle resizing adjustment
      setKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="w-full lg:w-10/12 px-2 xl:my-24 flex flex-col justify-center items-center mx-auto">
      <div className="w-full border-t-2 border-b-2 border-forth text-center my-2">
        <h2 className="text-3xl lg:text-4xl 2xl:text-5xl py-3 lg:px-24 font-cinzel">
          Porto Bello - Image Gallery
        </h2>
      </div>
      <div className="w-full lg:w-10/12 py-20 px-8">
        <Slider key={key} {...settings}>
          {images.map((image, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                title={image.title}
                src={image.image}
                alt={`Slide - ${image.alt}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
