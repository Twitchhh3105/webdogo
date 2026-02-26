import Home from "@/components/Home";
import { Metadata } from "next";
import { client } from "@/sanity/client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Neuronest | Nội Thất Gỗ Cao Cấp",
  description: "Trải nghiệm không gian sống đẳng cấp với Neuronest - Chuyên cung cấp nội thất gỗ tự nhiên tinh tế và sang trọng.",
};

export default async function HomePage() {
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc){
    _id,
    title,
    price,
    discountedPrice,
    description,
    "imageUrl": images[0].asset->url,
    categoryTitle,
    material
  }`);

  const categories = await client.fetch(`*[_type == "category"] | order(_createdAt asc){
    _id,
    title,
    "imageUrl": image.asset->url
  }`);

  return (
    <>
      <Home products={products} categories={categories} />
    </>
  );
}
