import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { client, writeClient } from "@/sanity/client";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Query user from Sanity by email
                const user = await client.fetch(
                    `*[_type == "user" && email == $email && provider == "credentials"][0]{
                        _id,
                        name,
                        email,
                        password,
                        role,
                        image
                    }`,
                    { email: credentials.email }
                );

                if (!user || !user.password) {
                    return null;
                }

                // Compare input password with bcrypt hash
                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
        newUser: "/signup",
        error: "/signin",
    },
    callbacks: {
        async signIn({ user, account }) {
            // Chỉ xử lý OAuth providers (Google, Facebook) — không xử lý credentials
            if (account?.provider && account.provider !== "credentials") {
                try {
                    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
                    if (!projectId || projectId === 'placeholder') {
                        // Sanity chưa cấu hình, bỏ qua việc lưu user
                        return true;
                    }

                    // Kiểm tra xem user đã tồn tại chưa
                    const existingUser = await client.fetch(
                        `*[_type == "user" && email == $email][0]{ _id }`,
                        { email: user.email }
                    );

                    if (!existingUser) {
                        // Tạo user mới trong Sanity
                        await writeClient.create({
                            _type: "user",
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            role: "user",
                            provider: account.provider,
                            createdAt: new Date().toISOString(),
                        });
                    }
                } catch (error) {
                    console.error("[Auth] Lỗi khi lưu OAuth user vào Sanity:", error);
                    // Vẫn cho phép đăng nhập dù lưu Sanity thất bại
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
    },
};
