"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Row } from "@/components/ui/row";
import ContactCard from "./ContactCard";
import { useContacts } from "./useContacts";

export default function ContactList() {
  const { contacts } = useContacts();

  return (
    <ScrollArea dir="rtl" className="w-full h-full">
      <Row direction="column" className="mt-20 mb-10 gap-y-3 ">
        {contacts.map(({ name, phone, id }) => (
          <ContactCard name={name} phone={phone} id={id} key={id} />
        ))}
      </Row>
    </ScrollArea>
  );
}
