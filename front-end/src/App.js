import React, { useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import routes from "./routes";
import Modal from "./Components/UI/Modal";
import Snackbar from "./Components/UI/Snackbar";
import Error from "./Components/UI/Error";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const notification = useSelector((state) => state.ui.notification);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notificationTitle = notification ? notification.title : null;

  useEffect(() => {
    setModalOpen(true);
    setSnackbarOpen(true);
  }, [notificationTitle]);

  const modalOptions = () => {
    return (
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Error />
      </Modal>
    );
  };

  const snackbarOptions = () => {
    return (
      <Snackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
    );
  };

  const routing = useRoutes(routes(loggedIn));

  return (
    <StyledEngineProvider injectFirst>
      {routing}

      {notificationTitle === "Success" ? snackbarOptions() : null}

      {notificationTitle === "Error" ? modalOptions() : null}
    </StyledEngineProvider>
  );
}
export default App;
