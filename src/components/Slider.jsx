/* eslint-disable react/prop-types */
import { useState } from "react";
import Slide from "./Slide";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider">
      <button className="slider-btn prev" onClick={prevSlide}>
        ❮
      </button>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {slides.map((slide, index) =>
          index === currentIndex ? (
            <Slide key={index} title={slide.title} descr={slide.descr} />
          ) : null
        )}
      </div>
      <button className="slider-btn next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Slider;
