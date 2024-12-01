import type { Metadata } from "next";
import "./main.css";
import {Providers} from "@/app/providers";

export const metadata: Metadata = {
  title: "SillyBox",
  description: "SillyBox email client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
    <body>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  );
}
