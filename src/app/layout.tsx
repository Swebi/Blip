import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className}`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <Toaster />
          <Navbar />

          <div className="flex flex-col min-h-screen justify-center items-center  p-5">
            {children}
          </div>

          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
