import React from "react";
import ShopDetails from "@/components/ShopDetails";
import RecentlyViewdItems from "@/components/ShopDetails/RecentlyViewd";
import { Metadata } from "next";
import { client } from "@/sanity/client";
import { Product } from "@/types/product";

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await client.fetch(`*[_type == "product" && _id == $id][0]`, { id });
    return {
        title: product ? `${product.title} | Neuronest` : "Shop Details Page | Neuronest",
        description: product?.description || "Chi tiết sản phẩm nội thất cao cấp Neuronest",
    };
}

const ShopDetailsPage = async ({ params }: Props) => {
    const { id } = await params;
    const productRaw = await client.fetch(`*[_type == "product" && _id == $id][0]{
    ...,
    "imageUrls": images[].asset->url
  }`, { id });

    let product: Product | undefined = undefined;
    if (productRaw) {
        product = {
            ...productRaw,
            imgs: {
                thumbnails: productRaw.imageUrls || [],
                previews: productRaw.imageUrls || []
            }
        };
    }

    return (
        <main>
            <ShopDetails product={product} />
            <RecentlyViewdItems />
        </main>
    );
};

export default ShopDetailsPage;
