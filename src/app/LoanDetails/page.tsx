"use client";

import React, { SyntheticEvent, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Slider,
  InputAdornment,
  SliderThumb,
  SelectChangeEvent,
  SliderProps,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Appshell } from "../Components/Appshell";
import { Stepper, steps } from "../Components/Stepper";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import { Lock } from "@/Icons/Lock";

const menuItems = ["1 gram", "1.5 gram", "2 gram", "3 gram"];

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "transparent",
  "& .MuiSlider-track": {
    height: 4,
    borderRadius: 1,
    backgroundColor: "#24247B",
  },
  "& .MuiSlider-rail": {
    height: 4,
    borderRadius: 1,
    backgroundColor: "#D0D5DD",
  },
  "& .MuiSlider-thumb": {
    color: "#fff",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    backgroundImage: `url(${Logo})`,
    borderRadius: "50%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    border: `2px solid #283487`,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
    },
  },
}));

export default function AddressDetails() {
  const [formInput, setFormInput] = useState({
    goldweightselect: "",
    loanAmount: 150000,
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
      | Event
  ) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormInput((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  interface CustomSliderThumbProps extends React.HTMLAttributes<unknown> {}

  function CustomSliderThumb(props: CustomSliderThumbProps) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <Image src={Logo} alt="logo" height={12} />
      </SliderThumb>
    );
  }

  return (
    <>
      <Appshell>
        {isMobile ? (
          <>
            <p className="my-2">
              {steps[3].title} {4}/{steps.length}
            </p>
            <LinearProgress
              variant="determinate"
              value={100}
              classes={{
                bar: "bg-[#C1943C]",
                root: "bg-[#d9d9d9]",
              }}
            />
          </>
        ) : (
          <Stepper activeIndex={4} />
        )}
        <div className="w-full p-4 flex flex-col py-8 items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full md:p-0 md:w-2/3 flex text-[#1D2939] mb-4 flex-col gap-2"
          >
            <p className="font-semibold text-xl md:text-md mb-2">Loan Amount</p>
            <label className="text-md md:text-sm">Select Gold Weight</label>
            <TextField
              select
              name="goldweightselect"
              label="Select Gold Mode"
              value={formInput.goldweightselect}
              onChange={handleInputChange}
              sx={{
                "& .MuiSelect-select": { height: "1rem" },
                "&. MuiSelect-outlined": { height: "1rem" },
                "&. MuiInputBase-input": { height: "1rem" },
                "&. MuiOutlinedInput-input": { height: "1rem" },
              }}
            >
              {menuItems.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
            <div className="flex w-full flex-col bg-white md:bg-[#F8F8F8] p-0 mt-4 gap-1 md:p-4 rounded-md">
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between">
                <label>Your Desired Loan Amount</label>
                <TextField
                  required
                  name="loanAmount"
                  value={formInput.loanAmount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiInputBase-input": { height: "0.5rem" },
                    "&. MuiOutlinedInput-input": { height: "0.5rem" },
                    "&. MuiInputBase-inputAdornedStart": { height: "0.5rem" },
                  }}
                />
              </div>
              <CustomSlider
                name="loanAmount"
                onChange={handleInputChange}
                valueLabelDisplay="auto"
                min={10000}
                max={1000000}
                value={formInput.loanAmount}
                step={5000}
                slots={{ thumb: CustomSliderThumb }}
              />
              <div className="w-full flex justify-between">
                <label className="flex gap-1">
                  Min<span className="font-semibold">10K</span>
                </label>
                <label className="flex gap-1">
                  Max<span className="font-semibold">10L</span>
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button
                className="w-1/3"
                variant="contained"
                sx={{
                  bgcolor: "#283487",
                }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
          <div className="text-sm flex gap-1 text-[#475647]">
            <div className="h-5 flex items-center justify-center rounded-full">
              <Lock />
            </div>
            <p className="w-full">
              Your data’s safety is our top priority. It is secured by
              cutting-edge encryption and privacy protocols.
            </p>
          </div>
        </div>
      </Appshell>
    </>
  );
}
