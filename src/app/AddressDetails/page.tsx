"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";

import { Appshell } from "../Components/Appshell";
import { Stepper, steps } from "../Components/Stepper";

import { useRouter } from "next/navigation";

export default function AddressDetails() {
  interface FormInput {
    address: string;
    pincode: string;
    city: string;
    state: string;
  }
  const [formInput, setFormInput] = useState<FormInput>({
    address: "",
    pincode: "",
    city: "",
    state: "",
  });
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "pincode") {
      const regex = /^[0-9\b]*$/;

      if (regex.test(value) && value.length <= 6) {
        setFormInput({
          ...formInput,
          [name]: value,
        });
      }
    } else {
      setFormInput({
        ...formInput,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/LoanDetails");
  };

  const isFormValid =
    formInput.address !== "" &&
    formInput.pincode !== "" &&
    formInput.pincode.length > 5 &&
    formInput.city !== "" &&
    formInput.state !== "";

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Appshell>
        <div>
          {isMobile ? (
            <>
              <p className="my-2">
                {steps[2].title} {3}/{steps.length}
              </p>
              <LinearProgress
                variant="determinate"
                value={66}
                classes={{
                  bar: "bg-[#C1943C]",
                  root: "bg-[#d9d9d9]",
                }}
              />
            </>
          ) : (
            <Stepper activeIndex={2} />
          )}
          <div className="w-full flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-2/3 gap-2 p-4 md:p-0 my-4 text-[#1D2939] flex flex-col"
            >
              <p className="text-xl md:text-md font-medium">
                Communication Address
              </p>
              <p className="text-md md:text-sm">
                Please enter communication address
              </p>
              <label className="text-md md:text-sm">Address Line 1*</label>
              <TextField
                name="address"
                placeholder="Enter Address Line 1"
                value={formInput.address}
                onChange={handleChange}
              />
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <label className="text-md md:text-sm">Pincode*</label>
                    <label className="text-md md:text-sm">
                      ({formInput.pincode.length}/6)
                    </label>
                  </div>
                  <TextField
                    name="pincode"
                    placeholder="Enter Pincode"
                    required
                    value={formInput.pincode}
                    onChange={handleChange}
                    inputProps={{
                      maxLength: 6,
                      pattern: "[0-9]*",
                    }}
                  />
                </div>
                <div className="flex text-md gap-1 md:text-sm flex-col">
                  <label>City*</label>
                  <TextField
                    name="city"
                    placeholder="Enter City"
                    value={formInput.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 text-md md:text-sm">
                  <label>State*</label>
                  <TextField
                    name="state"
                    placeholder="Enter State"
                    value={formInput.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center">
                <Button
                  className="w-1/3"
                  variant="contained"
                  disableElevation
                  disabled={!isFormValid}
                  sx={{
                    bgcolor: "#283487",
                    color: "white",
                  }}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Appshell>
    </>
  );
}
