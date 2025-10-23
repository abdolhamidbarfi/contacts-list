import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
}

type ContactState = Contact[];

const initialState: ContactState = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactsSlice.actions;
export default contactsSlice.reducer;
