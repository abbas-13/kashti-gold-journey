import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StyledEngineProvider } from "@mui/material/styles";

import "./globals.css";

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

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
});

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
      <body className={`${brooklyn.variable} ${inter.variable}`}>
        <link rel="icon" href="/favicon.ico" />
        <StyledEngineProvider injectFirst>
          <div className="bg-[#f9f9f9]" id="root">
            {children}
          </div>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
