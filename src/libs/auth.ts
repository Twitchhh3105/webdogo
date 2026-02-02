import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

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
                // Here you would typically look up the user in your database
                // For now, we'll just allow a test user
                if (
                    credentials?.email === "test@example.com" &&
                    credentials?.password === "password"
                ) {
                    return { id: "1", name: "Test User", email: "test@example.com" };
                }

                // Return null if user data could not be retrieved
                return null;
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
        error: "/signin", // Error code passed in query string as ?error=
    },
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                };
            }
            return token;
        },
    },
};
