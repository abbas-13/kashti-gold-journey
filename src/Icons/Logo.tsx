interface LogoProps {
  height: number;
  width: number;
}

export const Logo = ({ height, width }: LogoProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.8657 0C17.75 1.45518 20.5157 5.20934 20.5157 9.61112C20.5157 14.0129 17.75 17.767 13.8657 19.2222V0Z"
      fill="#F47D20"
    />
    <path
      d="M21.5415 20.929C19.9107 22.7228 15.7036 24 10.7708 24C5.8379 24 1.63079 22.7228 2.86102e-05 20.929L21.5415 20.929Z"
      fill="#2B8E44"
    />
    <path
      d="M12.2765 19.3942H3.06885L12.2765 5.00595V19.3942Z"
      fill="#2A3485"
    />
  </svg>
);
