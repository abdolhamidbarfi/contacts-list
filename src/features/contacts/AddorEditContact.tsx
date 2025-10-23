"use client";

import Form from "@/components/Form";
import { Row } from "@/components/ui/row";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useContacts } from "./useContacts";
import { z } from "zod";
import { Dialog } from "@/components/Modal";
import { useDocumentTitle } from "@/hooks/seDocumentTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export type contactSchemaValues = z.infer<typeof contactSchema>;

export default function AddorEditContact() {
  const navigate = useRouter();
  const { contactId } = useParams();
  const { dispatchUpdateContact, dispatchAddContact, getContactById } =
    useContacts();
  const [isContactExist, setIsContactExist] = useState<boolean>(false);

  const contact = getContactById(contactId as string);

  useDocumentTitle(contact ? `ویرایش ${contact.name} | دفترچه مخاطبین` : "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactSchemaValues>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmitForm(value: contactSchemaValues) {
    if (contactId) {
      dispatchUpdateContact({ ...value, id: contactId + "" });
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
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Field
            name="name"
            label="نام مخاطب"
            defaultValue={contact?.name || ""}
            placeholder="نام و نام خانوادگی"
            register={register}
            errorMessage={errors?.name?.message}
          />
          <Form.Field
            name="phone"
            label="شماره تماس"
            defaultValue={contact?.phone || ""}
            placeholder="09121234567"
            register={register}
            errorMessage={errors?.phone?.message}
          />
          <Form.Field
            name="email"
            label="ایمیل"
            type="email"
            defaultValue={contact?.email || ""}
            placeholder="sample@gmail.com"
            register={register}
            errorMessage={errors?.email?.message}
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
