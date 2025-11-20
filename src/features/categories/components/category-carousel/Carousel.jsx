import HuntCategories from "../hunt-categories/categories";
import { categoryImages } from "./data";
import React, { useRef, useState } from "react";
import carousel from "./carousel.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function Carousel() {
  return (
    <div className={carousel.category}>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={0}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        {Object.entries(categoryImages)
          .map(([text, img]) => [text, img])
          .filter(
            ([text]) =>
              text === "tech" ||
              text === "skin-care" ||
              text === "fragrances" ||
              text === "furniture" ||
              text === "groceries" ||
              text === "electronics" ||
              text === "mens-shoes" ||
              text === "womens-shoes" ||
              text === "mobile-accessories" ||
              text === "laptops" ||
              text === "smartphones",
          )
          .map(([text, img]) => (
            <SwiperSlide className={carousel.huntSlide}>
              <HuntCategories img={img} text={text} />
            </SwiperSlide>
          ))}
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
}
