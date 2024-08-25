import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Blip",
  description: "Open source code bin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col w-full h-full">
          <Toaster />

          <Navbar />
          <div className="h-fit w-full p-5  bg-[#131415]">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
