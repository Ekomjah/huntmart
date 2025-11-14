import React, { useRef, useState, useEffect } from "react";
import { CirclePlay, CirclePause } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function CarouselApp() {
  const [img, setImg] = useState([]);
  useEffect(() => {
    const urls = [
      "https://fakestoreapi.com/products",
      "https://dummyjson.com/products",
    ];

    async function getCarouselImages() {
      const res = await axios.get(urls[0]);
      const arr = res.data.map((el) => el.image);
      return arr;
    }
    async function getOtherImages() {
      const res = await axios.get(urls[1]);
      const arr = res.data.products.map((el) => el.images[0]);
      return arr;
    }
    Promise.all([getCarouselImages(), getOtherImages()]).then(
      ([img, otherImg]) => {
        const arr = [...img, ...otherImg];
        const index = [];
        for (let i = 0; i < 10; i++) {
          index.push(Math.floor(Math.random() * arr.length));
        }
        const setterArr = index.map((el) => arr[el]);
        console.log(setterArr);
        console.log(index);
        setImg(setterArr);
      }
    );
  }, []);
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
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper relative"
      >
        {img.map((image) => (
          <SwiperSlide>
            <div className="h-full">
              <img src={image} className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
        <div className="controls">
          <div className="control" onClick={handlePlaynPause}>
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
