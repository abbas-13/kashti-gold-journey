import Image from "next/image";

import ICICI from "../../../public/ICICIBank.png";
import YesBank from "../../../public/YesBank.png";
import Muthoot from "../../../public/Muthoot.png";

const partnerLogos = [
  ICICI,
  YesBank,
  Muthoot,
  ICICI,
  YesBank,
  Muthoot,
  ICICI,
  YesBank,
  Muthoot,
  ICICI,
  YesBank,
  Muthoot,
];

export const Partners = () => {
  return (
    <div className="w-full flex flex-col pt-4 gap-4 bg-white rounded-md md:drop-shadow-lg">
      <p className="px-4 text-xl md:text-lg font-semibold md:font-semibold">
        Our Banking Partners and NBFCs
      </p>
      <div className="border hidden md:block border-[0.5px] border-gray-300"></div>
      <div className="w-full flex gap-4 md:gap-8 pl-4 pb-6 overflow-x-scroll items-center">
        {partnerLogos.map((logo, index) => {
          return (
            <div
              key={index}
              className="md:max-h-[45%] rounded w-[33%] md:w-[10%] flex-none border p-2 h-auto"
            >
              <div className="w-full flex justify-center">
                <Image src={logo} alt="bank logo" height={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
