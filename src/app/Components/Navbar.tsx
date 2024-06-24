import Image from "next/image";
import Logo from "public/logo.png";

export const Navbar = () => {
  return (
    <div className="w-full h-14 shadow flex items-center">
      <div className="flex items-center gap-2 ml-4 md:ml-24">
        <Image alt="Logo" src={Logo} width={22} />
        <p className="font-brooklyn font-medium text-xl tracking-normal text-[#2b3980]">
          KASHTI
        </p>
      </div>
    </div>
  );
};
