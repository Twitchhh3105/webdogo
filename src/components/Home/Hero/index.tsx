"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";

const Hero = () => {
  const images = [
    "/images/hero/thumbnail.jpg",
    "/images/hero/thumbnail2.jpg",
    "/images/hero/thumbnail3.jpg",
  ];

  return (
    <section className="pt-[200px] sm:pt-[210px] lg:pt-[230px] xl:pt-[250px] bg-gray-1">
      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-8 xl:px-4 pb-6 lg:pb-10">
        {/* Full-Width Sliding Carousel */}
        <div className="rounded-[20px] overflow-hidden relative shadow-sm border border-gray-3 bg-white">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full hero-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-[16/7] sm:aspect-[2/1] lg:aspect-[21/9] bg-white">
                  <Image
                    src={img}
                    alt={`Hero Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-contain object-center"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
