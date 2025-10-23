"use client";

import Form from "@/components/Form";
import { Row } from "@/components/ui/row";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useContacts } from "./useContacts";
import { z } from "zod";
import { Dialog } from "@/components/Modal";
import { useDocumentTitle } from "@/hooks/seDocumentTitle";

const contactSchema = z.object({
  name: z.string().min(3, "نام الزامی است"),
  phone: z
    .string()
    .min(10, "شماره همراه صحیح نمی‌باشد")
    .regex(
      /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/,
      "فرمت وارد شده صحیح نمیباشد"
    ),
  email: z.email({ message: "ایمیل معتبر نیست" }).or(z.literal("")).optional(),
});

export default function AddorEditContact() {
  const navigate = useRouter();
  const { contactId } = useParams();
  const { dispatchUpdateContact, dispatchAddContact, getContactById } =
    useContacts();
  const [isContactExist, setIsContactExist] = useState<boolean>(false);

  const contact = getContactById(contactId as string);

  useDocumentTitle(contact ? `ویرایش ${contact.name} | دفترچه مخاطبین` : "");

  function handleSubmit(value: any) {
    if (contactId) {
      dispatchUpdateContact({ ...value, id: contactId });
      navigate.back();
    } else {
      const result = dispatchAddContact(value);

      result === "fulfilled"
        ? navigate.replace("/")
        : result === "rejected"
        ? setIsContactExist(true)
        : null;
    }
  }

  return (
    <>
      <Row direction="column" align="stretch" maxWidth="7xl" className="mt-32">
        <Form onSubmit={handleSubmit} zodSchema={contactSchema as any}>
          <Form.Field
            label="نام مخاطب"
            name="name"
            defaultValue={contact?.name || ""}
            placeholder="نام و نام خانوادگی"
          />
          <Form.Field
            label="شماره تماس"
            name="phone"
            defaultValue={contact?.phone || ""}
            placeholder="09121234567"
          />
          <Form.Field
            label="ایمیل"
            name="email"
            type="email"
            defaultValue={contact?.email || ""}
            placeholder="sample@gmail.com"
          />
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
            <Row>
              <Form.Submit>ذخیره</Form.Submit>
              <Form.Cancel>لغو</Form.Cancel>
            </Row>
          </div>
        </Form>
      </Row>
      {isContactExist && (
        <Dialog.Root defaultOpen>
          <Dialog.Content>
            <Dialog.Title>هشدار</Dialog.Title>
            <Dialog.Description>
              این شماره همراه مطعلق به مخاطب دیگری است
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Cancel
                onClick={() => {
                  setIsContactExist(false);
                }}
              >
                فهمیدم
              </Dialog.Cancel>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
