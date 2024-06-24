import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Security from "../../../public/lock.png";
import Edit from "../../../public/edit.png";

interface OTPInputProps {
  length?: number;
  onOtpSubmit: (otp: string) => void;
  phoneNumber: string;
}

export const OTPDialogContent = ({
  length = 4,
  onOtpSubmit,
  phoneNumber,
}: OTPInputProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [seconds, setSeconds] = useState<number>(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  const maskedPhoneNumber =
    phoneNumber && `${phoneNumber.slice(0, 4)}XXX${phoneNumber.slice(-3)}`;

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current!);
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setSeconds(60);
    startTimer();
  };

  const formatTime = (secs: number): string => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${seconds}s`;
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;

    if (isNaN(Number(value))) {
      return;
    }

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");

    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/AddressDetails");
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 rounded-lg">
      <form onSubmit={handleSubmit} className="h-full w-full flex flex-col">
        <label className="w-full text-center text-2xl font-medium tracking-wide text-[#1D2939]">
          OTP Verification
        </label>
        <label className="w-full text-sm text-[#1D2939] flex my-4 font-light items-center text-center">
          We have sent the 4-digit OTP to{" "}
          <p className="font-medium text-sm ml-1">+91-{maskedPhoneNumber}</p>
          <Image
            src={Edit}
            alt="edit icon"
            className="h-4 w-4 ml-1 cursor-pointer"
          />
        </label>
        <Box className="flex gap-3 justify-center">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                ref={(input) => {
                  if (input) {
                    inputRefs.current[index] = input;
                  }
                }}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                className="w-20 text-center font-medium text-xl h-14 border rounded border-[#2a3485] p-2"
              />
            );
          })}
        </Box>
        {seconds > 0 ? (
          <p className="w-full flex text-sm text-[#1D2939] my-4 font-light text-start">
            Resend OTP in&nbsp;&nbsp;
            <p className="text-[#f47D20] font-medium"> {formatTime(seconds)}</p>
          </p>
        ) : (
          <p
            onClick={resetTimer}
            className="text-[#f47D20] w-full text-sm my-4 text-start cursor-pointer"
          >
            Resend OTP
          </p>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            fontFamily: "Inter, sans-serif",
            color: "white",
            bgcolor: "#283487",
          }}
        >
          Verify OTP
        </Button>
      </form>

      <div className="flex items-center gap-3 ">
        <Image src={Security} alt="lock" className="w-[5%]" />
        <p className="text-[#475467] text-xs">
          Your data’s safety is our top priority. It is secured by cutting-edge
          encryption and privacy protocols.
        </p>
      </div>
    </div>
  );
};
