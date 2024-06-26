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
  <div className="md:grid md:grid-cols-1 md:col-start-4 md:col-span-4 place-items-center p-4 md:p-0 md:h-full md:self-center md:justify-center">
    <div className="flex gap-2 md:gap-2 md:pb-4 flex-col">
      <p className="text-white opacity-90 text-xl md:tracking-wide font-semibold md:font-semibold text-[#EAEBF3] md:w-full md:text-center md:text-3xl">
        Easy & Hassle-Free Gold Loan
      </p>
      <p className="text-white md:w-full font-light md:text-center tracking-wide md:font-normal text-sm leading-6 md:text-sm">
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
      <div className="w-full flex justify-between md:grid md:grid-cols-10 md:p-0 items-center max-h-fit md:h-64 bg-[#f57E21] z-10">
        {pathName === "/Signup" ? null : (
          <div className="flex h-full items-center ml-2 md:ml-0 md:items-start col-span-2 justify-start md:justify-end w-[83%]">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              variant="text"
              sx={{
                color: "white",
                textTransform: "capitalize",
                fontFamily: "Inter, sans-serif",
                fontWeight: "600",
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
        <div className="opacity-20 flex md:h-full items-end col-start-10 justify-end">
          {isMobile ? (
            <OpaqueLogo height="63" width="42" />
          ) : (
            <OpaqueLogo height="140" width="93" />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center md:-mt-[4rem] relative z-20">
        <div className="w-full md:w-[83%] bg-white md:rounded-md md:drop-shadow-lg p-4">
          {(() => {
            if (!isMobile && pathName !== "/Signup") {
              return (
                <div className="w-full absolute -top-5 flex justify-center">
                  <div className="h-0 w-0  border-l-[19.5px] border-l-transparent border-b-[19.5px] border-b-[#F79446] border-solid"></div>
                  <div className="relative w-[32%] bg-[#FBCAA4] p-1 rounded-b-lg flex justify-center">
                    <p className="font-semibold">Gold Loan</p>
                  </div>
                  <div className="h-0 w-0  border-r-[19.5px] border-r-transparent border-b-[19.5px] border-b-[#F79446] border-solid"></div>
                </div>
              );
            }
          })()}
          {children}
        </div>
        <div className="w-full md:w-[83%] my-4">
          <Partners />
        </div>
      </div>
    </div>
  );
};
