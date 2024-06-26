"use client";

import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Slider,
  InputAdornment,
  SliderThumb,
  SelectChangeEvent,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Appshell } from "../Components/Appshell";
import { Stepper, steps } from "../Components/Stepper";
import { Lock } from "@/Icons/Lock";
import { Logo } from "@/Icons/Logo";
import { CustomButton } from "../Components/CustomButton";

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
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    border: `2px solid #283487`,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
    },
  },
}));

interface CustomSliderThumbProps extends React.HTMLAttributes<unknown> {}

const CustomSliderThumb = (props: CustomSliderThumbProps) => {
  const { children, ...other } = props;

  return (
    <SliderThumb {...other}>
      {children}
      <Logo height={12} width={10} />
    </SliderThumb>
  );
};

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

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Appshell>
        {isMobile ? (
          <>
            <p className="my-2 font-semibold text-sm">
              {steps[3].title} ({4}/{steps.length})
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
          <Stepper activeIndex={3} />
        )}
        <div className="w-full md:p flex flex-col py-8 items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full md:p-0 md:w-2/3 flex text-[#1D2939] mb-4 flex-col gap-2"
          >
            <p className="font-semibold md:font-medium text-xl md:text-md mb-2">
              Loan Amount
            </p>
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
            <div className="w-full mt-4 md:mt-0 flex justify-center">
              <CustomButton
                onClick={handleSubmit}
                label="Submit"
                classes="w-full md:w-1/2"
              />
            </div>
          </form>
          <div className="flex items-center gap-3 md:gap-1">
            <Lock />
            <p className="w-full text-xs md:text-md col-span-5 text-[#475647] tracking-wide leading-[1.3rem]">
              Your data’s safety is our top priority. It is secured by
              cutting-edge encryption and privacy protocols.
            </p>
          </div>
        </div>
      </Appshell>
    </>
  );
}
