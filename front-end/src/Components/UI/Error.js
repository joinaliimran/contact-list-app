import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import ErrorImage from "../../assets/images/alert.png";
import classes from "./Error.module.css";

const Error = () => {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <Grid container>
      <Grid container spacing={2} align="center">
        <Grid item xs={12}>
          <img src={ErrorImage} width="60" height="50" alt={"Error pic"} />
        </Grid>

        {notification && notification.name ? (
          <Grid item xs={12} className={classes.errorNameGrid}>
            <span className={classes.errorName}>{notification.name}</span>
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <span className={classes.errorMessage}>{notification.message}</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Error;
