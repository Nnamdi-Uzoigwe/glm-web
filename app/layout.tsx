import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NavFooterWrapper from "@/components/NavFootWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gospel Light Ministries",
  description: "Gospel Light Ministries official website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
          <SessionProvider>
            <NavFooterWrapper>
            {children}
            </NavFooterWrapper>
          </SessionProvider>
      </body>
    </html>
  );
}
