"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hiddenRoutes = ["/admin", "/account", "/sign-in", "/register", "/not-found"];

export default function NavFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide = hiddenRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </>
  );
}