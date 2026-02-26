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
        return NextResponse.json({ user: null });
    }

    try {
        const user = await client.fetch(
            `*[_type == "user" && _id == $id][0]{ _id, name, email, phone, address, provider }`,
            { id: userId }
        );
        return NextResponse.json({ user: user || null });
    } catch (error) {
        console.error("[get-profile] Error:", error);
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}
