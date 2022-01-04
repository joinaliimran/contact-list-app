import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Layout/Header";
import ContactList from "../../Components/Contacts/ContactList";
import { getContacts } from "../../store/actions/contact-actions";

const Contacts = () => {
  const token = useSelector((state) => state.auth.tokenData.token);

  const dispatch = useDispatch(token);
  useEffect(() => {
    dispatch(getContacts(token));
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <ContactList />
    </>
  );
};

export default Contacts;
