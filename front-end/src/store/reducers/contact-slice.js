import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",

  initialState: {
    contacts: [],
  },

  reducers: {
    createContact(state, actions) {
      state.contacts.push(actions.payload.contact);
    },

    updateContact(state, actions) {
      const contactIndex = state.contacts.findIndex(
        (c) => c.id === actions.payload.contact.id
      );
      state.contacts[contactIndex] = actions.payload.contact;
    },

    setContacts(state, actions) {
      state.contacts = [];
      actions.payload.data.contacts.forEach((c) => {
        state.contacts.push({
          id: c._id,
          name: c.name,
          phoneNumbers: c.phoneNumbers,
        });
      });
    },

    deleteContact(state, actions) {
      state.contacts = state.contacts.filter(
        (c) => c.id !== actions.payload.contactId
      );
    },
  },
});

export const contactActions = contactSlice.actions;
export default contactSlice;
