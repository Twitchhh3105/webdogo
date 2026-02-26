"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";
import { useLanguage } from "@/hooks/useLanguage";
import { formatCurrency } from "@/utils/formatCurrency";
import shopData from "../Shop/shopData";
import { Product } from "@/types/product";

const ShopDetails = ({ product: propProduct }: { product?: Product }) => {
  const { t } = useLanguage();
  const [activeColor, setActiveColor] = useState("");
  const { openPreviewModal } = usePreviewSlider();
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("tabOne");

  const tabs = [
    { id: "tabOne", title: t.description },
    { id: "tabTwo", title: t.additionalInfo },
    { id: "tabThree", title: t.customerReviews },
  ];

  const colors = ["#8B4513", "#D2B48C", "#F5DEB3", "#A52A2A", "#5D4037"];

  const productFromStorage = useAppSelector(
    (state) => state.productDetailsReducer.value
  );

  // Fallback to propProduct, then Redux state, then first product if nothing in state
  const product = propProduct || (productFromStorage.title !== "" ? productFromStorage : shopData[0]);

  useEffect(() => {
    if (product.color && !activeColor) {
      setActiveColor(product.color);
    }
  }, [product, activeColor]);

  const handlePreviewSlider = () => {
    openPreviewModal();
  };

  return (
    <>
      <Breadcrumb title={t.shop} pages={[t.shop, t.products]} />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
            <div className="lg:max-w-[570px] w-full">
              <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center overflow-hidden">
                <button
                  onClick={handlePreviewSlider}
                  aria-label="button for zoom"
                  className="w-11 h-11 rounded-[5px] bg-white shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50 transition-all"
                >
                  <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22">
                    <path d="M11 4V18M4 11H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                {product.imgs?.previews?.[previewImg] && (
                  <Image
                    src={product.imgs.previews[previewImg]}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="object-contain hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                {product.imgs?.thumbnails.map((item, key) => (
                  <button
                    onClick={() => setPreviewImg(key)}
                    key={key}
                    className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 transition-all ${key === previewImg ? "border-blue ring-2 ring-blue/20" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <Image width={100} height={100} src={item} alt="thumbnail" className="object-cover h-full w-full" />
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-[539px] w-full">
              <div className="flex items-center justify-between mb-3 gap-4">
                <h2 className="font-bold text-2xl sm:text-3xl xl:text-4xl text-dark leading-tight">
                  {product.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-5.5 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 text-[#FFA645]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="fill-current" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M9 1L11.5 6.5L17.5 7.5L13.5 12L14.5 18L9 15L3.5 18L4.5 12L0.5 7.5L6.5 6.5L9 1Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-dark-4 text-sm font-medium"> ({product.reviews} {t.customerReviews}) </span>
                </div>

                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                  {t.inStock}
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                {product.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-blue">{formatCurrency(product.discountedPrice)}</span>
                    <span className="text-lg text-dark-4 line-through italic opacity-60">{formatCurrency(product.price)}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-blue">{formatCurrency(product.price)}</span>
                )}
              </div>


              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6 border-t border-gray-3 pt-8 pb-10">
                  <div className="flex items-center gap-6">
                    <h4 className="font-semibold text-dark min-w-[80px]">{t.color}:</h4>
                    <div className="flex items-center gap-3">
                      {colors.map((color, key) => (
                        <button
                          key={key}
                          type="button"
                          className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${activeColor === color ? "border-blue p-0.5 scale-110 shadow-lg" : "border-transparent"}`}
                          onClick={() => setActiveColor(color)}
                        >
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: color }}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <h4 className="font-semibold text-dark min-w-[80px]">{t.quantity}:</h4>
                    <div className="flex items-center rounded-lg border border-gray-3 bg-white shadow-sm overflow-hidden">
                      <button
                        className="flex items-center justify-center w-12 h-12 transition-all hover:bg-gray-100"
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      > - </button>
                      <span className="flex items-center justify-center w-14 h-12 font-bold text-lg border-x border-gray-3 text-dark">
                        {quantity}
                      </span>
                      <button
                        className="flex items-center justify-center w-12 h-12 transition-all hover:bg-gray-100"
                        onClick={() => setQuantity(quantity + 1)}
                      > + </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button className="w-full sm:w-auto flex-1 font-bold text-white bg-blue py-4 px-10 rounded-xl shadow-lg hover:bg-blue-dark transition-all transform hover:-translate-y-1 active:translate-y-0">
                    {t.addToCart}
                  </button>
                  <button className="w-full sm:w-auto shrink-0 flex-1 font-bold text-dark border-2 border-dark py-4 px-10 rounded-xl hover:bg-dark hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0">
                    {t.purchaseNow}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#FBFBFB] py-20">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center bg-white rounded-2xl shadow-md gap-4 sm:gap-10 p-2 sm:p-4 mb-10 overflow-hidden">
            {tabs.map((item, key) => (
              <button
                key={key}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 sm:flex-none font-semibold text-base py-3 px-6 rounded-xl transition-all duration-300 ${activeTab === item.id ? "bg-blue text-white shadow-md shadow-blue/20" : "text-dark-4 hover:bg-gray-100 hover:text-dark"}`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm min-h-[400px]">
            {activeTab === "tabOne" && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-dark mb-6">{t.description}</h3>
                <p className="text-dark-4 leading-relaxed text-lg mb-8">{product.description}</p>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <div className="bg-blue/5 p-6 rounded-2xl">
                    <h4 className="font-bold text-blue text-lg mb-4">🏠 {t.specifications}</h4>
                    <p className="text-dark-4">{t.material}: <span className="text-dark font-medium">{product.material}</span></p>
                    <p className="text-dark-4 mt-2">{t.dimensions}: <span className="text-dark font-medium">{product.dimensions}</span></p>
                    <p className="text-dark-4 mt-2">{t.weight}: <span className="text-dark font-medium">{product.weight}</span></p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-green-700 text-lg mb-4">🛡️ {t.warranty}</h4>
                    <p className="text-dark-4">{t.warranty}: <span className="text-dark font-medium">{product.warranty}</span></p>
                    <p className="text-dark-4 mt-2">{t.brand}: <span className="text-dark font-medium">{product.brand || "Neuronest"}</span></p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tabTwo" && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-dark mb-8">{t.additionalInfo}</h3>
                <div className="divide-y divide-gray-100">
                  {[
                    { label: t.brand, value: product.brand || "Neuronest" },
                    { label: t.material, value: product.material },
                    { label: t.dimensions, value: product.dimensions },
                    { label: t.weight, value: product.weight },
                    { label: t.color, value: product.color },
                    { label: t.warranty, value: product.warranty }
                  ].map((info, i) => (
                    <div key={i} className="flex py-5 group hover:bg-gray-50 transition-colors px-4 rounded-lg">
                      <span className="w-1/3 text-dark-4 font-medium">{info.label}</span>
                      <span className="w-2/3 text-dark font-bold">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tabThree" && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-dark mb-10">{t.customerReviews}</h3>
                <div className="flex flex-col gap-8">
                  <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex gap-6 items-start">
                    <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center shrink-0 font-bold text-blue text-xl">HD</div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-dark">Hoàng Đình</h4>
                        <span className="text-xs text-dark-4">12/10/2025</span>
                      </div>
                      <div className="flex text-yellow-400 text-xs mb-3">★★★★★</div>
                      <p className="text-dark-4 leading-relaxed italic">"Sản phẩm rất đẹp, đóng gói kỹ càng. Nhân viên giao hàng nhiệt tình. Chắc chắn sẽ quay lại mua thêm."</p>
                    </div>
                  </div>

                  <div className="mt-10 p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                    <h4 className="text-xl font-bold text-dark mb-6">{t.writeReview}</h4>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-dark-4">{t.yourRating}*</span>
                        <div className="text-gray-300 text-2xl flex gap-1 cursor-pointer">
                          <span className="hover:text-yellow-400">★</span>
                          <span className="hover:text-yellow-400">★</span>
                          <span className="hover:text-yellow-400">★</span>
                          <span className="hover:text-yellow-400">★</span>
                          <span className="hover:text-yellow-400">★</span>
                        </div>
                      </div>
                      <textarea placeholder={t.comments} className="w-full p-5 rounded-2xl border-2 border-white focus:border-blue outline-none transition-all shadow-sm" rows={4}></textarea>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input type="text" placeholder={t.name} className="p-4 rounded-xl border-2 border-white focus:border-blue outline-none transition-all shadow-sm" />
                        <input type="email" placeholder={t.emailPlaceholder} className="p-4 rounded-xl border-2 border-white focus:border-blue outline-none transition-all shadow-sm" />
                      </div>
                      <button className="bg-dark text-white font-bold py-4 px-12 rounded-xl hover:bg-black transition-all shadow-lg self-start">
                        {t.submitReview}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default ShopDetails;
