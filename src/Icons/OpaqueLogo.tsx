interface OpaqueLogoProps {
  height: string;
  width: string;
}

export const OpaqueLogo = ({ height, width }: OpaqueLogoProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 93 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M83.9103 0.583984C107.295 9.49826 123.946 32.4958 123.946 59.4605C123.946 86.4253 107.295 109.423 83.9103 118.337V0.583984Z"
      fill="#E9F4EC"
    />
    <path
      d="M131.009 127.756C121.114 138.76 95.5867 146.596 65.6558 146.596C35.725 146.596 10.1978 138.76 0.302902 127.756L131.009 127.756Z"
      fill="#E9F4EC"
    />
    <path
      d="M74.4848 118.336H19.1409L74.4848 31.1983V118.336Z"
      fill="#E9F4EC"
    />
  </svg>
);
