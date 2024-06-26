"use client";

import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useMediaQuery } from "@mui/material";

import clsx from "clsx";
import { styled } from "@mui/system";

import { BasicDetails } from "../../Icons/BasicDetails";
import { IncomeDetails } from "../../Icons/IncomeDetails";
import { EmploymentDetails } from "../../Icons/EmploymentDetails";
import { KYCDetails } from "../../Icons/KYCDetails";

export const steps = [
  { title: "Basic Details" },
  { title: "Income Details" },
  { title: "Employment Details" },
  { title: "KYC Details" },
];

const iconMap = {
  basicDetails: BasicDetails,
  incomeDetails: IncomeDetails,
  employmentDetails: EmploymentDetails,
  kycDetails: KYCDetails,
};

interface IconProps {
  src: string;
  color?: string;
  active: boolean;
  completed: boolean;
}

const StepIcon = ({ src, color, active, completed }: IconProps) => {
  const iconName = src
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("") as keyof typeof iconMap;

  const BaseIcon = iconMap[iconName];

  const baseClasses =
    "h-12 z-10 w-12 p-2 flex items-center justify-center rounded-full";
  const activeClasses = "bg-[#2a3485] fill-white";
  const incompleteClasses = "bg-[#EDEDED] fill-black";

  const appliedClasses = clsx(baseClasses, {
    [activeClasses]: active || completed,
    [incompleteClasses]: !active && !completed,
  });

  return (
    <div className={appliedClasses}>
      <BaseIcon color={active || completed ? "white" : "black"} />
    </div>
  );
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#2a3485",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#2a3485",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#EDEDED",
    borderRadius: 1,
  },
  [`&.${stepConnectorClasses.disabled}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      border: 1,
    },
  },
}));

interface StepperProps {
  activeIndex: number;
}

export const Stepper = ({ activeIndex }: StepperProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="flex justify-center my-4">
      <MuiStepper
        activeStep={activeIndex}
        alternativeLabel
        sx={{ width: "57%" }}
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepLabel
              sx={{
                "& .Mui-active": {
                  fontWeight: "600 !important",
                  color: "#213485 !important",
                },
              }}
              StepIconComponent={() => {
                return (
                  <StepIcon
                    src={step.title}
                    completed={activeIndex > index}
                    active={activeIndex === index}
                  />
                );
              }}
            >
              {step.title}
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </div>
  );
};
