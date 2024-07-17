import React, { useState } from "react";

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = ["/slidebar.png", "/slidebar.png", "/slidebar.png"];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-[400px] relative">
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                index === activeIndex ? "" : "hidden"
              }`}
              data-carousel-item
            >
              <img
                src={imageUrl}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 -bottom-6 left-1/2 space-x-3 rtl:space-x-reverse">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-[8px] h-[8px] rounded-full ${
                index === activeIndex ? "bg-primary-blue w-[40px]" : "bg-gray-300"
              }`}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <img src="/SwipeBannerLeft.svg" alt="Previous Swipe" />
            <span className="sr-only">Previous</span>
        </button>

        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <img src="/SwipeBanner.svg" alt="Next Swipe" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
