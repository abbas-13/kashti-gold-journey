import { Box } from "@mui/system";
import { useEffect, useRef, useState, KeyboardEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Edit from "../../../public/edit.png";
import { CustomButton } from "./CustomButton";
import { Lock } from "@/Icons/Lock";

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

  console.log({ otp });
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

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");

    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

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
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    router.push("/AddressDetails");
  };

  const isOtpComplete = useMemo(
    () => otp.every((digit) => digit !== ""),
    [otp]
  );

  return (
    <div className="h-full w-full flex flex-col gap-4 rounded-lg">
      <form onSubmit={handleSubmit} className="h-full w-full flex flex-col">
        <label className="w-full text-center text-xl md:text-2xl font-semibold md:font-medium md:tracking-wide text-[#1D2939]">
          OTP Verification
        </label>
        <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row my-4 md:justify-center items-center">
          <label className="text-xs md:text-sm text-[#1D2939] font-normal md:font-light items-center text-center">
            We have sent the 4-digit OTP to
          </label>
          <div className="flex mt-2 md:mt-0">
            <p className="font-medium text-xs md:text-sm md:ml-1">
              +91-{maskedPhoneNumber}
            </p>
            <Image
              src={Edit}
              alt="edit icon"
              className="h-3 w-3 md:h-4 md:w-4 ml-1 cursor-pointer"
            />
          </div>
        </div>
        <Box className="flex gap-3 justify-center">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                required
                ref={(input) => {
                  if (input) {
                    inputRefs.current[index] = input;
                  }
                }}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                inputMode="numeric"
                pattern="[0-9]*"
                min={1}
                max={1}
                className="w-16 h-12 md:w-20 md:h-14 text-center font-medium text-xl border rounded border-[#2a3485] p-2"
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
            className="text-[#f47D20] w-full font-semibold md:font-normal text-sm my-4 text-start cursor-pointer"
          >
            Resend OTP
          </p>
        )}
        <div className="w-full flex justify-center">
          <CustomButton
            onClick={handleSubmit}
            label="Verify OTP"
            classes="w-[100%]"
            disabled={!isOtpComplete}
          />
        </div>
      </form>

      <div className="flex items-center gap-3 md:gap-3">
        <Lock />
        <p className="w-full text-xs md:text-md col-span-5 text-[#475647] tracking-wide leading-[1.3rem]">
          Your data’s safety is our top priority. It is secured by cutting-edge
          encryption and privacy protocols.
        </p>
      </div>
    </div>
  );
};
