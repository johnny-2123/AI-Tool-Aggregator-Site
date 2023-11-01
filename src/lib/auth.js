import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/src/lib/prisma";
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          //check if credentials are missing
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const existingUser = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (!existingUser) {
            return null;
          }

          const passwordsMatch = await compare(
            credentials.password,
            existingUser.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return {
            id: `${existingUser.id}`,
            username: existingUser.username,
            email: existingUser.email,
          };
        } catch (error) {
          console.log("Something went wrong during authorization", error);
          return null;
        }
      },
    }),
  ],
};
