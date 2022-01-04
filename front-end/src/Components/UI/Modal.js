import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/reducers/ui-slice";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./Modal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  borderRadius: "5px",
  bgcolor: "background.paper",
  border: "1px solid #eee",
  boxShadow: 24,
  p: 4,
};

const InputModal = (props) => {
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();
  const portalElement = document.getElementById("overlays");

  return ReactDOM.createPortal(
    <Modal
      open={props.modalOpen}
      onClose={
        // it requires a function not a value
        () => {
          props.setModalOpen(false);
          dispatch(
            uiActions.showNotification({
              title: "",
              name: "",
              message: "",
            })
          );
        }
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          className={classes.modalTitle}
        >
          {notification ? notification.title : null}
        </Typography>

        {/* <Typography
          id="modal-modal-description"
          component="span"
          sx={{ mt: 2 }}
        > */}
        {props.children}
        {/* </Typography> */}
      </Box>
    </Modal>,
    portalElement
  );
};
export default InputModal;
