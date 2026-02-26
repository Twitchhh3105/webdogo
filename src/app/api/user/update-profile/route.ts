import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { writeClient } from "@/sanity/client";

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
        return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
    }

    const body = await req.json();
    const { name, phone, address } = body;

    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "Tên không được để trống" }, { status: 400 });
    }

    try {
        await writeClient.patch(userId).set({
            name: name.trim(),
            phone: phone?.trim() || "",
            address: address?.trim() || "",
        }).commit();

        return NextResponse.json({ success: true, message: "Cập nhật thông tin thành công" });
    } catch (error) {
        console.error("[update-profile] Error:", error);
        return NextResponse.json({ error: "Lỗi server khi cập nhật thông tin" }, { status: 500 });
    }
}
