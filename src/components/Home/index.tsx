import React from "react";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import BestSeller from "./BestSeller";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

const Home = ({ products, categories }: { products: Product[], categories: Category[] }) => {
  return (
    <main>
      <Hero />
      <NewArrival products={products} />
      <BestSeller products={products} />
    </main>
  );
};

export default Home;
