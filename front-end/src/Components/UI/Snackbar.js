import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/reducers/ui-slice";
import ReactDOM from "react-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InputSnackbar = (props) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const handleClose = (event, reason) => {
    dispatch(
      uiActions.showNotification({
        title: "",
        name: "",
        message: "",
      })
    );

    if (reason === "clickaway") {
      return;
    }
    props.setSnackbarOpen(false);
  };

  const portalElement = document.getElementById("overlays");

  return ReactDOM.createPortal(
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Stack>,
    portalElement
  );
};
export default InputSnackbar;
