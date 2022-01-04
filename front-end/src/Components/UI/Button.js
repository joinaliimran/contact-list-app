import React from "react";
import { Button } from "@mui/material";

const InputButton = (props) => {
  return (
    <Button className={props.className} {...props.input}>
      {props.children}
    </Button>
  );
};

export default InputButton;
