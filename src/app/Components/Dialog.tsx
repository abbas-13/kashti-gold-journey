import DialogTitle from "@mui/material/DialogTitle";
import MuiDialog from "@mui/material/Dialog";
import { OTPDialogContent } from "./OTPDialogContent";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  phoneNumber: string;
}

export const Dialog = (props: SimpleDialogProps) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <MuiDialog
      onClose={handleClose}
      open={open}
      sx={{
        ".MuiDialog-paper": {
          padding: {
            xs: "2rem 1rem 2rem 1rem",
            sm: "2rem",
          },
          borderRadius: "0.5rem",
          width: {
            xs: "100%",
            sm: "34%",
          },
          margin: {
            xs: "1rem",
            sm: "auto",
          },
        },
      }}
    >
      <OTPDialogContent
        phoneNumber={props.phoneNumber}
        onOtpSubmit={(number) => console.log({ number })}
      />
    </MuiDialog>
  );
};
