import HuntCategories from "../hunt-categories/categories";
import { categoryImages } from "./data";
import carousel from "./carousel.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Carousel() {
  return (
    <div className={carousel.category}>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={0}
        navigation={window.innerWidth >= 768}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
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
      </Swiper>
    </div>
  );
}
