import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { getAuthenticated } from "../../store/actions/auth-actions";

import classes from "./Signin.module.css";

const initialValues = {
  email: "",
  password: "",
};

const formValidation = Yup.object().shape({
  email: Yup.string().email("Email is invalid.").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long.")
    .required("Required"),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Grid>
      <Paper elevation={5} className={classes.paper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <LoginIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>

        <Formik
          initialValues={{
            ...initialValues,
          }}
          validationSchema={formValidation}
          onSubmit={(values) => {
            dispatch(getAuthenticated(values, navigate));
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    touched={props.touched}
                    errors={props.errors}
                    input={{
                      id: "outlined-basic",
                      name: "email",
                      label: "Email",
                      type: "email",
                      variant: "outlined",
                      fullWidth: true,
                      autoComplete: "on",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    touched={props.touched}
                    errors={props.errors}
                    input={{
                      id: "outlined-basic",
                      name: "password",
                      label: "Password",
                      type: "password",
                      variant: "outlined",
                      fullWidth: true,
                      autoComplete: "on",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography className={classes.accountText}>
                    No Account?
                    <Link to="/signup" className={classes.signupLink}>
                      Create One
                    </Link>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    input={{
                      disabled: !props.isValid,
                      color: "primary",
                      variant: "contained",
                      type: "submit",
                      fullWidth: true,
                    }}
                  >
                    SIGN IN
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signin;
