import React, { useRef, useState } from "react";
import { CirclePlay, CirclePause } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import img2 from "../../assets/pictures/freestocks-_3Q3tsJ01nc-unsplash.jpg";
import { cn } from "../../utils/utils";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./styles.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function CarouselApp() {
  const img = [
    "https://res.cloudinary.com/ekomjah/image/upload/v1767458493/1_oid11x.png",
    "https://res.cloudinary.com/ekomjah/image/upload/v1767458486/2_ebe1mt.png",
    img2,
  ];
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const progressCircle = useRef(null);
  const swiperRef = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
  };

  const handlePlaynPause = () => {
    if (!swiperRef.current) return;

    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={cn(styles.mySwiper, "relative")}
      >
        {img.map((image) => (
          <SwiperSlide key={image}>
            <div className={cn(styles["slide-inner"], "h-full w-full")}>
              {!loadedImages[image] && (
                <div className="absolute inset-0 h-full w-full animate-pulse bg-gray-400"></div>
              )}
              <img
                src={image}
                alt="carousel"
                loading="lazy"
                onLoad={() =>
                  setLoadedImages((prev) => ({ ...prev, [image]: true }))
                }
              />
            </div>
          </SwiperSlide>
        ))}
        <div className={styles["autoplay-progress"]} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
        <div className={styles.controls}>
          <div className={styles.control} onClick={handlePlaynPause}>
            {isPlaying ? (
              <CirclePause color="red" />
            ) : (
              <CirclePlay color="red" />
            )}
          </div>{" "}
        </div>
      </Swiper>
    </div>
  );
}
