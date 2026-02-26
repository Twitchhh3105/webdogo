import React from "react";
import { client } from "@/sanity/client";
import { Product } from "@/types/product";
import RecentlyViewdSlider from "./RecentlyViewdSlider";

const RecentlyViewdItems = async () => {
  const rawProducts = await client.fetch(
    `*[_type == "product"] | order(_createdAt desc) [0...8] {
      _id,
      title,
      price,
      discountedPrice,
      description,
      material,
      dimensions,
      warranty,
      brand,
      weight,
      color,
      "imageUrls": images[].asset->url
    }`
  );

  const products: Product[] = (rawProducts || []).map((p: any) => ({
    ...p,
    id: p._id,
    reviews: 0,
    imgs: {
      thumbnails: p.imageUrls || [],
      previews: p.imageUrls || [],
    },
  }));

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <RecentlyViewdSlider products={products} />
      </div>
    </section>
  );
};

export default RecentlyViewdItems;
