"use client";

import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Checkbox,
  Button,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Dialog } from "../Components/Dialog";
import { Appshell } from "@/app/Components/Appshell";
import { Lock } from "@/Icons/Lock";
import { CustomButton } from "../Components/CustomButton";

export default function Signup() {
  interface FormData {
    name: string;
    number: string;
    checkbox: boolean;
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    number: "",
    checkbox: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    if (name === "number") {
      const regex = /^[0-9\b]*$/;

      if (regex.test(value) && value.length <= 10) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpen();
  };

  const isFormValid =
    formData.name !== "" &&
    formData.number !== "" &&
    formData.number.length > 9 &&
    formData.checkbox;

  return (
    <>
      <Appshell>
        <div className="flex flex-col h-full md:h-auto py-2 md:items-center md:pt-12 md:pb-8 gap-4 ">
          <p className="md:hidden font-semibold md:font-medium text-xl md:text-2xl">
            Gold Loan
          </p>

          <form
            onSubmit={handleForm}
            className="md:w-[67%] flex justify-center gap-2 md:pb-4 items-center"
          >
            <div className="flex flex-col md:gap-6">
              <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full justify-between">
                <div className="flex w-auto md:w-[49%] flex-col gap-1">
                  <label className="text-sm flex gap-1 items-center text-[#1d2939]">
                    Name*
                    <Tooltip disableFocusListener title="info">
                      <InfoOutlinedIcon
                        sx={{ width: "auto", height: "14px", color: "#2a3485" }}
                      />
                    </Tooltip>
                  </label>
                  <TextField
                    required
                    name="name"
                    value={formData.name}
                    placeholder="Enter Name as per PAN"
                    onChange={handleChange}
                    classes={{
                      root: "font-inter",
                    }}
                  />
                </div>
                <div className="flex w-auto md:w-[49%] flex-col gap-1">
                  <label className="text-sm text-[#1d2939]">
                    Mobile Number*
                  </label>
                  <TextField
                    required
                    name="number"
                    value={formData.number}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                    inputProps={{
                      maxLength: 10,
                      pattern: "[0-9]*",
                    }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex w-full my-4 mb-6 md:mb-2 md:my-2 items-center">
                <Checkbox
                  required
                  name="checkbox"
                  value={formData.checkbox}
                  onChange={handleChange}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 20, color: "#344054" },
                  }}
                />
                <label className="text-[#5c5757] text-xs md:text-sm md:font-light w-full">
                  By submitting this form, you have read and agreed to
                  the&nbsp;&nbsp;
                  <a href="#" className="font-semibold text-[#2A3485]">
                    Credit Report
                  </a>
                  ,&nbsp;&nbsp;
                  <a href="#" className="font-semibold text-[#2A3485]">
                    Terms of Use&nbsp;&nbsp;
                  </a>
                  and&nbsp;&nbsp;
                  <a href="#" className="font-semibold text-[#2A3485]">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <div className="w-full flex justify-center">
                <CustomButton
                  onClick={handleOpen}
                  disabled={!isFormValid}
                  classes="md:w-1/2 w-full"
                  label="Verify and Proceed"
                />
              </div>
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
      <Dialog open={open} phoneNumber={formData.number} onClose={handleClose} />
    </>
  );
}
