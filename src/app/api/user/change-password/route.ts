import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { client, writeClient } from "@/sanity/client";
import bcrypt from "bcryptjs";

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
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
        return NextResponse.json({ error: "Mật khẩu mới không khớp" }, { status: 400 });
    }

    if (newPassword.length < 6) {
        return NextResponse.json({ error: "Mật khẩu mới phải có ít nhất 6 ký tự" }, { status: 400 });
    }

    try {
        // Fetch user from Sanity
        const user = await client.fetch(
            `*[_type == "user" && _id == $id && provider == "credentials"][0]{ _id, password, provider }`,
            { id: userId }
        );

        if (!user) {
            return NextResponse.json(
                { error: "Tài khoản này đăng nhập bằng mạng xã hội, không thể đổi mật khẩu ở đây" },
                { status: 400 }
            );
        }

        if (!user.password) {
            return NextResponse.json({ error: "Không tìm thấy mật khẩu hiện tại" }, { status: 400 });
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Mật khẩu hiện tại không đúng" }, { status: 400 });
        }

        // Hash new password and save
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await writeClient.patch(userId).set({ password: hashedPassword }).commit();

        return NextResponse.json({ success: true, message: "Đổi mật khẩu thành công" });
    } catch (error) {
        console.error("[change-password] Error:", error);
        return NextResponse.json({ error: "Lỗi server khi đổi mật khẩu" }, { status: 500 });
    }
}
