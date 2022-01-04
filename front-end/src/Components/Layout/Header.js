import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "../UI/Button";
import InputLoading from "../UI/Loading";
import Modal from "../UI/Modal";
import AddEditContact from "../Contacts/AddEditContact";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/reducers/ui-slice";
import { authActions } from "../../store/reducers/auth-slice";
import classes from "./Header.module.css";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const loading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {loading && loading === true ? <InputLoading /> : "Contact List"}
            </Typography>

            <Button
              className={classes.addContactButton}
              input={{
                variant: "outlined",
                color: "inherit",
                onClick: () => {
                  setModalOpen(true);
                  dispatch(
                    uiActions.showNotification({
                      title: "Add Contact Form",
                      name: "",
                      message: "",
                    })
                  );
                },
              }}
            >
              Add Contact
            </Button>

            <Button
              input={{
                variant: "outlined",
                color: "inherit",
                onClick: () => logoutHandler(),
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <AddEditContact
          setModalOpen={setModalOpen}
          submitButtonName={"Add Contact"}
        />
      </Modal>
    </>
  );
};
export default Navbar;
