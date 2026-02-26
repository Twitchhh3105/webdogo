import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { client } from "@/sanity/client";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
        return NextResponse.json({ orders: [] });
    }

    try {
        const orders = await client.fetch(
            `*[_type == "order" && user._ref == $userId] | order(orderDate desc) {
        _id,
        orderDate,
        orderStatus,
        paymentStatus,
        totalAmount,
        "items": items[] {
          quantity,
          price,
          "productTitle": product->title,
          "productImage": product->images[0].asset->url
        },
        customerInfo
      }`,
            { userId }
        );

        return NextResponse.json({ orders: orders || [] });
    } catch (error) {
        console.error("[orders] Error:", error);
        return NextResponse.json({ error: "Lỗi khi tải đơn hàng" }, { status: 500 });
    }
}
