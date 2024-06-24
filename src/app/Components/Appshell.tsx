"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, useMediaQuery } from "@mui/material";

import { Navbar } from "./Navbar";
import { OpaqueLogo } from "@/Icons/OpaqueLogo";
import { Partners } from "./Partners";

type AppshellProps = {
  children: ReactNode;
};

const Header = () => (
  <div className="grid grid-cols-1 col-start-4 col-span-4 place-items-center p-2 md:p-0 md:h-full md:self-center md:justify-center">
    <div className="flex gap-1 flex-col">
      <p className="text-white text-xl  md:text-3xl">
        Easy & Hassle-Free Gold Loan
      </p>
      <p className="text-white font-light md:font-normal text-sm md:text-sm">
        User safety, our priority. <br className="md:hidden"></br>Get Quick &
        Safe gold loan through kashti
      </p>
    </div>
  </div>
);

export const Appshell = ({ children }: AppshellProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="flex flex-col items-center relative">
      <Navbar />
      <div className="w-full grid grid-cols-10 p-4 md:p-0 md:items-center md:h-64 bg-[#f57E21] z-10">
        {pathName === "/Signup" ? null : (
          <div className="flex h-full items-start col-span-2 justify-end w-[83%]">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              variant="text"
              sx={{
                color: "white",
                textTransform: "capitalize",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Gold Loan
            </Button>
          </div>
        )}
        {(() => {
          if (!isMobile || (isMobile && pathName === "/Signup")) {
            return <Header />;
          }
        })()}
        <div className="opacity-20 flex h-full items-end col-start-10 justify-end">
          <OpaqueLogo />
        </div>
      </div>
      <div className="w-full flex flex-col items-center md:-mt-[4rem] relative z-20">
        <div className="w-full md:w-[83%] bg-white md:rounded-md drop-shadow-lg p-4">
          {!isMobile && (
            <div className="w-full absolute -top-5 flex justify-center">
              <div className="h-0 w-0  border-l-[19.5px] border-l-transparent border-b-[19.5px] border-b-[#F79446] border-solid"></div>
              <div className="relative w-[32%] bg-[#FBCAA4] p-2 rounded-b-lg flex justify-center">
                <p className="font-semibold">Gold Loan</p>
              </div>
              <div className="h-0 w-0  border-r-[19.5px] border-r-transparent border-b-[19.5px] border-b-[#F79446] border-solid"></div>
            </div>
          )}
          {children}
        </div>
        <div className="w-full md:w-[83%] my-4">
          <Partners />
        </div>
      </div>
    </div>
  );
};
