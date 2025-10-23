"use client";
import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Row } from "@/components/ui/row";
import ContactCard from "./ContactCard";
import { useContacts } from "./useContacts";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { initContacts } from "./contactsSlice";

export default function ContactList() {
  const { contacts } = useContacts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contacts") || "[]");
    dispatch(initContacts(stored));
  }, []);

  if (!contacts.length) {
    return (
      <Empty className="h-screen ">
        <EmptyHeader className="gap-y-5">
          <EmptyMedia
            variant="icon"
            className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center"
          >
            <User
              className={cn("!h-12 !w-12 text-muted-foreground text-gray-700")}
            />
          </EmptyMedia>
          <EmptyTitle className="text-2xl font-bold">
            مخاطبی وجود ندارد
          </EmptyTitle>
          <EmptyDescription>
            هنوز هیچ مخاطبی وارد نکرده اید، برای شروع روی دکمه زیر کلیک کنید
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/new" prefetch>
                افزودن مخاطب جدید
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    );
  }
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
