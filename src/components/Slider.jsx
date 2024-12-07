/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({ slides }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="slide mt-30"
            style={{ backgroundImage: `url(${slide.imgUrl})` }}
          >
            <div className="slide-content">
              <h3 className="slide-title">{slide.title}</h3>
              <p className="slide-descr">{slide.descr}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
}
