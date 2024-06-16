import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [visibleCards, setVisibleCards] = useState(5);
  const carouselRef = useRef();

  const updateVisibleCards = () => {
    if (window.innerWidth < 768) {
      setVisibleCards(3);
    } else {
      setVisibleCards(5);
    }
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const preventTouch = (e) => {
      const touch = e.touches[0];
      if (touchPosition !== null) {
        const diff = touchPosition - touch.clientX;
        if (diff > 5) {
          goToNext();
        } else if (diff < -5) {
          goToPrevious();
        }
      }
    };

    const touchWrapper = carouselRef.current;
    touchWrapper.addEventListener("touchmove", preventTouch);
    return () => {
      if (touchWrapper) {
        touchWrapper.removeEventListener("touchmove", preventTouch);
      }
    };
  }, [touchPosition]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchPosition(touch.clientX);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touchPosition !== null) {
      setTouchPosition(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    setTouchPosition(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - visibleCards : products.length - visibleCards
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - visibleCards ? prevIndex + visibleCards : 0
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex gap-4 overflow-hidden w-full
          h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80"
      >
        {products
          .slice(currentIndex, currentIndex + visibleCards)
          .map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}
              className={`flex flex-col justify-center ${
                visibleCards === 5
                  ? "w-1/5 sm:w-1/4 md:w-1/5 lg:w-1/6"
                  : "w-1/3"
              }`}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <h3 className="text-sm md:text-lg font-semibold">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold">${product.price}</p>
            </Link>
          ))}
      </div>
      <div className="flex mt-4 space-x-2">
        {Array.from(
          { length: Math.ceil(products.length / visibleCards) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleCards)}
              className={`h-2 w-2 rounded-full ${
                currentIndex >= index * visibleCards &&
                currentIndex < (index + 1) * visibleCards
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            />
          )
        )}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full"
      >
        &#8249;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
