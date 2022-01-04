import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../store/actions/auth-actions";

import classes from "./Signup.module.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formValidation = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Email is invalid.").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long.")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Grid>
      <Paper elevation={5} className={classes.paper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>

        <Formik
          initialValues={{
            ...initialValues,
          }}
          validationSchema={formValidation}
          onSubmit={(values) => {
            dispatch(createAccount(values, navigate));
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    touched={props.touched}
                    errors={props.errors}
                    input={{
                      id: "outlined-basic",
                      name: "name",
                      label: "Name",
                      type: "text",
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
                  <Input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.confirmPassword}
                    touched={props.touched}
                    errors={props.errors}
                    input={{
                      id: "outlined-basic",
                      name: "confirmPassword",
                      label: "Confirm Password",
                      type: "password",
                      variant: "outlined",
                      fullWidth: true,
                      autoComplete: "on",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography className={classes.accountText}>
                    Already have an account?
                    <Link to="/signin" className={classes.signinLink}>
                      Signin
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
                    SIGN UP
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

export default Signup;
