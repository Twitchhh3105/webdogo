import React from "react";

import HeroFeature from "./HeroFeature";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#F5EDE0]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Big Static Banner (Dining) - Ref Image 0 */}
          <div className="col-span-12 lg:col-span-8 rounded-[20px] bg-gradient-to-br from-[#FDFBF8] to-[#F2ECE6] relative overflow-hidden p-8 lg:p-12 xl:p-16 flex items-center group shadow-sm border border-[#EBE5DC]/50">
            <div className="relative z-10 max-w-[55%]">
              <div className="flex items-start gap-4 mb-4">
                <span className="font-playfair font-bold text-[64px] lg:text-[80px] leading-[0.8] text-[#5D4E37]">
                  25%
                </span>
                <div className="flex flex-col justify-center pt-2">
                  <span className="text-xl lg:text-2xl text-[#5D4E37] font-medium leading-none mb-1">Giảm</span>
                  <span className="text-xl lg:text-2xl text-[#5D4E37] font-medium leading-none">Giá</span>
                </div>
              </div>

              <h1 className="font-playfair font-bold text-3xl lg:text-5xl text-[#3D2B1F] mb-6 leading-tight">
                Bàn Ăn Gỗ Sồi <br /> 6 Chỗ
              </h1>

              <p className="text-[#7D6E5F] mb-8 font-medium leading-relaxed max-w-[380px] text-base lg:text-lg">
                Bàn ăn gỗ sồi nguyên khối, vân gỗ tự nhiên đẹp mắt, phù hợp cho gia đình 4-6 người.
              </p>

              <a
                href="/shop-with-sidebar"
                className="inline-flex items-center gap-2 bg-[#5D4E37] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-[#3D2B1F] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Mua Ngay
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[55%] h-[80%]">
              <Image
                src="/images/hero/hero-dining.png"
                alt="bàn ăn gỗ sồi"
                fill
                className="object-contain object-center drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Column: Stacked Cards (Bed & Sofa) - Ref Image 0 Right Side */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

            {/* Top Card: Bed */}
            <div className="flex-1 rounded-[20px] bg-white p-6 relative overflow-hidden group hover:shadow-lg transition-all border border-gray-100 flex flex-col justify-between">
              <div className="relative z-10">
                <h3 className="font-playfair font-bold text-2xl text-dark mb-1 leading-tight w-[70%]">
                  Giường Ngủ Hiện Đại
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ưu đãi có hạn</p>
                <div className="flex flex-col mt-1">
                  <span className="text-red font-bold text-xl">8.500.000₫</span>
                  <span className="text-gray-400 line-through text-sm">12.000.000₫</span>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-[180px] h-[180px] xl:w-[200px] xl:h-[200px]">
                <Image
                  src="/images/hero/hero-bed-new.png"
                  alt="giường ngủ"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Card: Sofa */}
            <div className="flex-1 rounded-[20px] bg-white p-6 relative overflow-hidden group hover:shadow-lg transition-all border border-gray-100 flex flex-col justify-between">
              <div className="relative z-10">
                <h3 className="font-playfair font-bold text-2xl text-dark mb-1 leading-tight w-[70%]">
                  Sofa Góc Tiện Nghi
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ưu đãi có hạn</p>
                <div className="flex flex-col mt-1">
                  <span className="text-red font-bold text-xl">5.500.000₫</span>
                  <span className="text-gray-400 line-through text-sm">7.500.000₫</span>
                </div>
              </div>
              <div className="absolute right-[-10px] bottom-[-10px] w-[180px] h-[180px] xl:w-[200px] xl:h-[200px]">
                <Image
                  src="/images/hero/hero-sofa-new.png"
                  alt="sofa"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
