import React, { useState } from "react";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ContactsIcon from "@mui/icons-material/Contacts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "../../Components/UI/Button";
import Modal from "../UI/Modal";
import AddEditContact from "./AddEditContact";
import { deleteContact } from "../../store/actions/contact-actions";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/reducers/ui-slice";
import classes from "./ContactListItem.module.css";

const ContactListItem = (props) => {
  const [openListItem, setOpenListItem] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = useSelector((state) => state.auth.tokenData.token);
  const dispatch = useDispatch();

  const contactClickHandler = (counter) => {
    const arr = [...openListItem];
    arr[counter] = !arr[counter];
    setOpenListItem(arr);
  };

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId, token));
  };

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => contactClickHandler(props.contactsCounter)}
      >
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>

        <ListItemText primary={props.contact.name} />
        {openListItem[props.contactsCounter] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse
        in={openListItem[props.contactsCounter]}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" className={classes.list}>
          <Grid container>
            <Grid item xs={8}>
              {props.contact.phoneNumbers.map((p, phoneNumbersCounter) => (
                <React.Fragment key={p}>
                  <span className={classes.phoneNumberHeading}>
                    {phoneNumbersCounter === 0
                      ? "Phone Number"
                      : `Optional Phone Number ${phoneNumbersCounter}`}
                  </span>
                  <span className={classes.phoneNumber}>{p}</span>
                </React.Fragment>
              ))}
            </Grid>

            <Grid item xs={4}>
              <Button
                input={{
                  color: "primary",
                  onClick: () => {
                    setModalOpen(true);
                    dispatch(
                      uiActions.showNotification({
                        title: "Edit Contact Form",
                        name: "",
                        message: "",
                      })
                    );
                  },
                }}
              >
                Edit
              </Button>

              <Button
                color="error"
                input={{
                  color: "error",
                  onClick: () => deleteContactHandler(props.contact.id),
                }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </List>
      </Collapse>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <AddEditContact
          setModalOpen={setModalOpen}
          edit={true}
          submitButtonName={"Edit Contact"}
          contact={props.contact}
        />
      </Modal>
    </React.Fragment>
  );
};

export default ContactListItem;
