import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { client } from "@/sanity/client";

export const revalidate = 0;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cửa hàng | Neuronest Furniture",
  description: "Khám phá bộ sưu tập nội thất gỗ cao cấp tại Neuronest.",
};

const ShopWithSidebarPage = async () => {
  const products = await client.fetch(`*[_type == "product"]{
    _id,
    title,
    price,
    discountedPrice,
    description,
    "imageUrl": images[0].asset->url,
    "categoryTitle": category->title,
    "space": material
  }`);

  const categories = await client.fetch(`*[_type == "category"]{
    title,
    "count": count(*[_type == "product" && references(^._id)])
  }`);

  const categoryCounts = categories.map((cat: any) => ({
    name: cat.title,
    products: cat.count
  }));

  // We are storing "Không gian" in "material" field for now (as seen in the earlier schemas). Let's extract all unique "space" values and count.
  const allSpaces = products.map(p => p.space).filter(Boolean);
  const spaceCountsMap = allSpaces.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const genderCounts = Object.keys(spaceCountsMap).map(space => ({
    name: space,
    products: spaceCountsMap[space]
  }));

  return (
    <main>
      <ShopWithSidebar
        passedProducts={products}
        categoryCounts={categoryCounts}
        genderCounts={genderCounts}
      />
    </main>
  );
};

export default ShopWithSidebarPage;
