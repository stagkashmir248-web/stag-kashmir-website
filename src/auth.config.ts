import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export default {
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            // Always allow the admin email to bypass any linking errors
            if (user?.email === "stagkashmir248@gmail.com") {
                return true;
            }
            return true;
        },
        session: async ({ session, token }) => {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    }
} satisfies NextAuthConfig
