import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import prisma from "@/utils/prisma";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Busca o usuário no banco
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { accounts: true },
                });

                if (!user) return null;

                const hasCredentialsAccount = user.accounts.some(
                    (acc) => acc.provider === "credentials"
                );
                if (!hasCredentialsAccount) {
                    throw new Error("Este e-mail está vinculado ao login com Google ou Facebook.");
                }

                if (!user.password) return null;

                const isValid = await compare(credentials.password, user.password);
                if (!isValid) return null;
                return { id: user.id, email: user.email, name: user.name ?? null };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt" as const
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (session?.user && token?.id) {
                session.user.id = token.id;
                session.user.email = token.email ?? session.user.email;
            }
            return session;
        },

        async signIn({ user, account }) {
            if (!account) return false;

            if (account.provider !== "credentials") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                    include: { accounts: true },
                });

                if (existingUser) {
                    const hasProvider = existingUser.accounts.some(
                        (acc) => acc.provider === account.provider
                    );

                    if (!hasProvider) {
                        return false;
                    }

                    return true;
                }

                return true;
            }

            if (account.provider === "credentials") {
                return true;
            }

            return false;
        },
    },
    pages: {
        signIn: "/",
    }
    
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
