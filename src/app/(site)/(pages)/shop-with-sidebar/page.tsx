import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cửa hàng | Neuronest Furniture",
  description: "Khám phá bộ sưu tập nội thất gỗ cao cấp tại Neuronest.",
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
