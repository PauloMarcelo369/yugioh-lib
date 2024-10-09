import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import kaiba from "../../assets/slider/kaiba.jpeg";
import BackGround from "../../assets/images/BackGround.jpg";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const swiperRef = useRef(null);
  const backgrounds = [kaiba, BackGround, kaiba];

  useEffect(() => {
    const swiperContainer = document.querySelector(".swiper");
    const nextButton = document.querySelector(".swiper-button-next");
    const prevButton = document.querySelector(".swiper-button-prev");

    if (swiperContainer) {
      swiperContainer.style.position = "relative";
      swiperContainer.style.zIndex = "";
    }

    if (nextButton && prevButton) {
      nextButton.style.zIndex = "3";
      nextButton.style.color = "white";
      prevButton.style.color = "white";
      prevButton.style.zIndex = "3";
    }
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
      >
        {backgrounds.map((background, index) => (
          <SwiperSlide key={index}>
            <img src={background} alt={`background ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
