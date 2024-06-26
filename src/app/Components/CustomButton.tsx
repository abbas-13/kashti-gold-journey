interface CustomButtonProps {
  label: string;
  classes: string;
  onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const CustomButton = (props: CustomButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type="submit"
      className={`bg-[#283487] rounded-xl md:rounded-md text-white font-inter p-2 md:text-sm capitalize ${
        props.classes
      } ${props.disabled ? "bg-[#DDDFEB] cursor-not-allowed" : "bg-[#283487]"}`}
    >
      {props.label}
    </button>
  );
};
