import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import {
  addContact,
  Contact,
  deleteContact,
  updateContact,
} from "./contactsSlice";
import { v4 as uuidv4 } from "uuid";

//contacts hook
export function useContacts() {
  const dispatch = useAppDispatch();

  //get all contacts
  const contacts = useAppSelector((s) => s.contacts);

  //Get a Contact
  const getContactByPhone = useCallback(
    (phone: string): Contact | undefined => {
      return contacts.find((contact) => contact.phone === phone);
    },
    [contacts]
  );

  const getContactById = useCallback(
    (id: string): Contact | undefined => {
      return contacts.find((contact) => contact.id === id);
    },
    [contacts]
  );

  //add new Contact
  const dispatchAddContact = (contact: Omit<Contact, "id">) => {
    //check exist contact
    const isExist = !!getContactByPhone(contact.phone);
    if (!isExist) {
      const id = uuidv4();
      dispatch(addContact({ ...contact, id }));
      return "fulfilled";
    } else {
      //update is exist contact to true
      return "rejected";
    }
  };

  //Update a Contact
  const dispatchUpdateContact = (contact: Contact) => {
    dispatch(updateContact(contact));
  };

  //Delete a Contact
  const dispatchDeleteContact = (id: string) => {
    if (id !== undefined) {
      dispatch(deleteContact(id));
    }
  };

  return {
    contacts,
    getContactByPhone,
    getContactById,
    dispatchAddContact,
    dispatchUpdateContact,
    dispatchDeleteContact,
  };
}
