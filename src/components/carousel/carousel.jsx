  import React, { useRef, useState } from "react";
  import { CirclePlay, CirclePause } from "lucide-react";
  import { Swiper, SwiperSlide } from "swiper/react";
  import img1 from "../../assets/pictures/charlesdeluvio-FK81rxilUXg-unsplash.jpg";
  import img2 from "../../assets/pictures/freestocks-_3Q3tsJ01nc-unsplash.jpg";
  import img3 from "../../assets/pictures/freestocks-VFrcRtEQKL8-unsplash.jpg";
  import img4 from "../../assets/pictures/maria-lin-kim-8RaUEd8zD-U-unsplash.jpg";
  import img5 from "../../assets/pictures/nathan-waters-ykH4Wtocefc-unsplash.jpg";
  import { cn } from "../../lib/utils";
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";

  import styles from "./styles.module.css";

  // import required modules
  import { Autoplay, Pagination, Navigation } from "swiper/modules";

  export default function CarouselApp() {
    const img = [img1, img2, img3, img4, img5];
    const [isPlaying, setIsPlaying] = useState(true);
    const progressCircle = useRef(null);
    const swiperRef = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      // progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
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
      <>
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
                <img src={image} className="w-full" />
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
      </>
    );
  }
