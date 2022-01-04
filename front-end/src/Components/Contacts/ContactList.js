import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import { Grid } from "@mui/material";
import ContactListItem from "./ContactListItem";
import { useSelector } from "react-redux";
import classes from "./ContactList.module.css";

const ContactList = (props) => {
  const contacts = useSelector((state) => state.contact.contacts);

  return (
    <Grid container className={classes.container}>
      <List
        sx={{ width: "100%", maxWidth: "35%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {contacts.length > 0
              ? "All Contacts"
              : "There are no contacts to display."}
          </ListSubheader>
        }
      >
        {contacts.length > 0 &&
          contacts.map((contact, contactsCounter) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              contactsCounter={contactsCounter}
            />
          ))}
      </List>
    </Grid>
  );
};

export default ContactList;
