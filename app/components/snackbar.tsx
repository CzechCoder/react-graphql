import { Alert, AlertColor, Snackbar } from "@mui/material";
import { Dispatch, FC, SetStateAction, useCallback } from "react";

type CustomSnackbarProps = {
  snackState: {
    open: boolean;
    message: string;
    severity: AlertColor;
  };
  onClose: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      severity: AlertColor;
    }>
  >;
};

export const CustomSnackbar: FC<CustomSnackbarProps> = ({
  snackState,
  onClose,
}) => {
  const handleClose = useCallback(() => {
    onClose((prevSnackState) => ({
      ...prevSnackState,
      open: false,
    }));
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackState.open}
      autoHideDuration={5000}
      onClose={handleClose}
      key="custom snack"
    >
      <Alert
        severity={snackState.severity}
        variant="filled"
        onClose={handleClose}
      >
        {snackState.message}
      </Alert>
    </Snackbar>
  );
};
