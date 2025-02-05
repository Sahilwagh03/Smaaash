import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { SmoothScrolling } from "@/components/SmoothScroll";
import Footer from "@/components/footer";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
  title: "Smaaash - Home",
  description: "The Smaaash Entertainment Arcade gaming center is the best gaming arcade in India, first of its kind, offering a variety of games with cutting-edge technology for people of all ages. We specialize in net cricket, bowling and gamification. Our offerings include a unique twilight bowling zone, motor and bike racing simulators, and go-karting tracks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
