import { uiActions } from "../reducers/ui-slice";
import { contactActions } from "../reducers/contact-slice";
import config from "../../config.json";

const apiUrl = config.apiUrl;
export const createUpdateContact = (values, edit, contact, token) => {
  return async (dispatch) => {
    const phoneNumbers = values.phoneNumbers.filter((p) => p !== "");
    const name = values.name;
    let url =
      edit !== true
        ? `${apiUrl}/contact/contact`
        : `${apiUrl}/contact/contact/${contact.id}`;

    try {
      let response = await fetch(url, {
        method: edit !== true ? "POST" : "PUT",
        body: JSON.stringify({
          name: name,
          phoneNumbers: phoneNumbers,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const contact = {
          id: responseData.contact._id,
          name: responseData.contact.name,
          phoneNumbers: responseData.contact.phoneNumbers,
        };

        let message = "";

        if (edit !== true) {
          message = "Contact created successfully!";
          dispatch(
            contactActions.createContact({
              contact: contact,
            })
          );
        } else {
          message = "Contact updated successfully!";
          dispatch(
            contactActions.updateContact({
              contact: contact,
            })
          );
        }

        dispatch(
          uiActions.showNotification({
            title: "Success",
            name: "",
            message: message,
          })
        );
      } else {
        const responseData = await response.json();
        dispatch(
          uiActions.showNotification({
            title: "Error",
            name: responseData.name || "",
            message: responseData.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          title: "Error",
          name: err.name,
          message: err.message,
        })
      );
    }
  };
};

export const getContacts = (token) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading({ loading: true }));
    let url = `${apiUrl}/contact/contact`;

    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        dispatch(uiActions.setIsLoading({ loading: false }));
        const responseData = await response.json();

        dispatch(
          contactActions.setContacts({
            data: responseData,
          })
        );
      } else {
        const responseData = await response.json();
        dispatch(uiActions.setIsLoading({ loading: false }));
        dispatch(
          uiActions.showNotification({
            title: "Error",
            name: responseData.name || "",
            message: responseData.message,
          })
        );
      }
    } catch (err) {
      dispatch(uiActions.setIsLoading({ loading: false }));
      dispatch(
        uiActions.showNotification({
          title: "Error",
          name: err.name,
          message: err.message,
        })
      );
    }
  };
};

export const deleteContact = (contactId, token) => {
  return async (dispatch) => {
    let url = `${apiUrl}/contact/contact/${contactId}`;

    try {
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        await response.json();
        dispatch(
          contactActions.deleteContact({
            contactId: contactId,
          })
        );

        dispatch(
          uiActions.showNotification({
            title: "Success",
            name: "",
            message: "Contact deleted successfully!",
          })
        );
      } else {
        const responseData = await response.json();
        dispatch(
          uiActions.showNotification({
            title: "Error",
            name: responseData.name || "",
            message: responseData.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          title: "Error",
          name: err.name,
          message: err.message,
        })
      );
    }
  };
};
