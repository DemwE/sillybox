import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserData {
  email: string;
  imapHost?: string;
  imapPort?: number;
  smtpHost?: string;
  smtpPort?: number;
}

declare module "next-auth" {
  interface User {
    userData?: UserData;
  }

  interface Session {
    user?: {
      name?: string | null;
    },
    userData?: UserData;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        imapHost: { label: "IMAP Host", type: "text" },
        imapPort: { label: "IMAP Port", type: "number" },
        smtpHost: { label: "SMTP Host", type: "text" },
        smtpPort: { label: "SMTP Port", type: "number" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        return {
          id: "1",
          name: credentials.name,
          userData: {
            email: credentials.email,
            imapHost: credentials.imapHost,
            imapPort: Number(credentials.imapPort),
            smtpHost: credentials.smtpHost,
            smtpPort: Number(credentials.smtpPort),
          },
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.name = user.name;
        token.userData = user.userData;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.name = token.name;
        session.userData = token.userData as UserData;
      }
      return session;
    },
  }
};