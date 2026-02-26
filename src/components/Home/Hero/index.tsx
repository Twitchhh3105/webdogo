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
    <section className="pb-10 lg:pb-15 pt-48 sm:pt-40 lg:pt-32 xl:pt-36 bg-[#F5EDE0]">
      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-8 xl:px-4 pt-6 lg:pt-8 pb-6 lg:pb-10">
        {/* Full-Width Sliding Carousel */}
        <div className="rounded-[20px] overflow-hidden relative shadow-sm border border-[#EBE5DC]/50 bg-white">
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
                <div className="relative w-full aspect-[16/7]">
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
