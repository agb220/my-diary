import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Diary",
  description: "Nice diary app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} bg-gray-500 h-screen container font-sans`}
      >
        <div className="flex flex-col items-center min-h-full justify-between">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
