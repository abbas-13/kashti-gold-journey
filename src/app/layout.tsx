import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./Components/Navbar";
import Brooklyn from "@next/font/local";

const brooklyn = Brooklyn({
  src: [
    {
      path: "../../public/fonts/Brooklyn Normal 1.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Brooklyn Bold 1.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Brooklyn Heavy 1.otf",
      weight: "800",
    },
    {
      path: "../../public/fonts/Brooklyn SemiBold.otf",
      weight: "500",
    },
  ],
  variable: "--font-brooklyn",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kashti",
  description: "Gold loan journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${brooklyn.variable} font-sansinter.className`}>
        <div className="h-full w-full">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
