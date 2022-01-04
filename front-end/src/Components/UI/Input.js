import React from "react";
import { TextField } from "@mui/material";
import _ from "lodash";
const Input = (props) => {
  return (
    <TextField
      onChange={props.onChange}
      onBlur={props.onBlur}
      error={
        _.get(props.touched, props.input.name) &&
        _.get(props.errors, props.input.name) &&
        true
      }
      helperText={
        _.get(props.touched, props.input.name) &&
        _.get(props.errors, props.input.name)
      }
      value={props.value}
      {...props.input}
    />
  );
};

export default Input;
