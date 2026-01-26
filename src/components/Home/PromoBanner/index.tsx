import React from "react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- Big Banner (Pastel Beige) --> */}
        <div className="relative rounded-[30px] bg-[#F9F5F0] overflow-hidden group shadow-sm mb-8 flex flex-col md:flex-row items-center p-8 lg:p-16 gap-8 transition-all hover:shadow-md">

          <div className="w-full md:w-1/2 z-10">
            <span className="block text-[#8C7E6F] uppercase tracking-[0.2em] text-xs font-bold mb-4">
              New Collection
            </span>
            <h2 className="font-playfair font-bold text-4xl lg:text-5xl xl:text-6xl text-[#3D2B1F] mb-6 leading-[1.1]">
              Sofa Gỗ <br /> <span className="italic text-[#5D4E37] opacity-80">Artisan</span>
            </h2>
            <p className="text-[#5D4E37] text-lg mb-8 leading-relaxed max-w-[450px]">
              Sự kết hợp hoàn hảo giữa gỗ sồi tự nhiên và vải nỉ cao cấp. Mang lại vẻ đẹp vượt thời gian cho phòng khách.
            </p>
            <a
              href="#"
              className="inline-block bg-[#5D4E37] text-white hover:bg-[#3D2B1F] text-sm font-bold uppercase tracking-widest py-4 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Khám Phá Ngay
            </a>
          </div>

          <div className="w-full md:w-1/2 relative h-[300px] md:h-[450px]">
            <Image
              src="/images/promo/promo-sofa-new.png"
              alt="sofa gỗ cao cấp"
              fill
              className="object-contain object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </div>
        </div>

        {/* <!-- Small Banners (Grid) --> */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">

          {/* Banner 1: Desk (Darker Beige) */}
          <div className="relative h-[350px] bg-[#EBE5DC] rounded-[30px] overflow-hidden group p-10 cursor-pointer transition-all hover:shadow-md">
            <div className="relative z-10 max-w-[60%]">
              <span className="block text-[#5D4E37] font-bold text-sm mb-2 uppercase tracking-wider">Workspace</span>
              <h3 className="font-playfair font-bold text-3xl md:text-4xl text-[#3D2B1F] mb-4 leading-tight">
                Không Gian <br /> Sáng Tạo
              </h3>
              <p className="text-[#7D6E5F] text-base mb-6">Gỗ thông nhập khẩu & thiết kế tối giản.</p>
              <span className="inline-flex items-center gap-2 text-[#3D2B1F] font-bold text-sm uppercase tracking-wide border-b border-[#3D2B1F] pb-1 group-hover:opacity-70 transition-opacity">
                Xem Chi Tiết
              </span>
            </div>
            <div className="absolute -right-5 -bottom-10 w-[320px] h-[320px]">
              <Image
                src="/images/promo/promo-desk-new.png"
                alt="bàn làm việc"
                fill
                className="object-contain transform group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Banner 2: Lamp (Sage Green) */}
          <div className="relative h-[350px] bg-[#D8E0D8] rounded-[30px] overflow-hidden group p-10 cursor-pointer transition-all hover:shadow-md">
            <div className="absolute top-10 right-10 z-10 text-right max-w-[60%] ml-auto">
              <span className="block text-[#4A5D4A] font-bold text-sm mb-2 uppercase tracking-wider">Lighting</span>
              <h3 className="font-playfair font-bold text-3xl md:text-4xl text-[#2F3E2F] mb-4 leading-tight">
                Ánh Sáng <br /> Tự Nhiên
              </h3>
              <p className="text-[#5F705F] text-base mb-6">Giảm 40% cho các mẫu đèn sàn thủ công.</p>
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-2 text-[#2F3E2F] font-bold text-sm uppercase tracking-wide border-b border-[#2F3E2F] pb-1 group-hover:opacity-70 transition-opacity">
                  Mua Ngay
                </span>
              </div>
            </div>
            <div className="absolute left-[-20px] bottom-[-20px] w-[280px] h-[320px]">
              <Image
                src="/images/promo/promo-lamp-new.png"
                alt="đèn trang trí"
                fill
                className="object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
