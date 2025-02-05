"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import Footer from "./footer";
import { AuthProvider } from "@/context/AuthContext";
import { SmoothScrolling } from "./SmoothScroll";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    
    const hiddenPaths = ["/dashboard", "/profile", "/settings"];

    const shouldHideHeaderFooter = hiddenPaths.some((path) =>
        pathname.startsWith(path)
    );

    return (
        <>
            <AuthProvider>
                {!shouldHideHeaderFooter && <Header />}
                <SmoothScrolling>
                    {children}
                </SmoothScrolling>
                {!shouldHideHeaderFooter && <Footer />}
            </AuthProvider>
        </>
    );
}
