import React from "react";
import { Formik, FieldArray, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { createUpdateContact } from "../../store/actions/contact-actions";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./AddEditContact.module.css";

const initialValues = (contact, edit) => {
  return {
    name: edit !== true ? "" : contact.name,
    phoneNumbers: edit !== true ? [""] : contact.phoneNumbers,
  };
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formValidation = Yup.object().shape({
  name: Yup.string().required("Required"),
  phoneNumbers: Yup.array().of(
    Yup.string()
      .min(8, "Phone number is atleast 8 characters long.")
      .matches(phoneRegExp, "Phone number is not valid.")
  ),
});

const AddEditContact = ({
  setModalOpen,
  submitButtonName,
  edit = false,
  contact = {},
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.tokenData.token);

  return (
    <Grid container>
      <Formik
        initialValues={initialValues(contact, edit)}
        validationSchema={formValidation}
        onSubmit={(values) => {
          setModalOpen(false);
          dispatch(createUpdateContact(values, edit, contact, token));
        }}
      >
        {(props) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={10}>
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

              <FieldArray name={"phoneNumbers"}>
                {(arrayHelpers) => (
                  <>
                    {props.values.phoneNumbers
                      ? props.values.phoneNumbers.map((item, index) => (
                          <React.Fragment key={index}>
                            <Grid item xs={8}>
                              <Input
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.phoneNumbers[index]}
                                touched={props.touched}
                                errors={props.errors}
                                input={{
                                  id: "outlined-basic",
                                  name: `phoneNumbers[${index}]`, //target the area where you want to place the value
                                  label:
                                    index > 0
                                      ? `Optional Phone Number ${index}`
                                      : "Phone Number",
                                  type: "text",
                                  variant: "outlined",
                                  fullWidth: true,
                                  autoComplete: "on",
                                }}
                              />
                            </Grid>

                            <Grid item xs={1}>
                              <IconButton
                                onClick={() => arrayHelpers.remove(index)}
                                disabled={
                                  props.values.phoneNumbers.length === 1
                                }
                                className={classes.addRemoveIcon}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Grid>

                            <Grid item xs={1}>
                              <IconButton
                                onClick={() => {
                                  arrayHelpers.push("");
                                }}
                                className={classes.addRemoveIcon}
                                disabled={props.values.phoneNumbers.some(
                                  (val) => val === ""
                                )}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          </React.Fragment>
                        ))
                      : null}
                  </>
                )}
              </FieldArray>

              <Grid item xs={12}>
                {props.values.phoneNumbers.every((val) => val === "") &&
                props.touched.phoneNumbers ? (
                  <div className={classes.errorMessage}>
                    {"You must add atleast one phone number."}
                  </div>
                ) : null}
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
                  {submitButtonName}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default AddEditContact;
