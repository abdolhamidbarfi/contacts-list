"use client";
import Form from "@/components/Form";
import { Row } from "@/components/ui/row";
import React from "react";

export default function AddContact() {
  function handleSubmit(value: any) {
    console.log(value);
  }
  return (
    <Row direction="column" align="stretch" maxWidth="7xl" className="mt-32">
      <Form onSubmit={handleSubmit}>
        <Form.Field label="نام مخاطب" name="name" />
        <Form.Field label="شماره تماس" name="phone" />
        <Form.Field label="ایمیل" name="email" type="email" />
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <Row>
            <Form.Submit>ذخیره</Form.Submit>
            <Form.Cancel>لغو</Form.Cancel>
          </Row>
        </div>
      </Form>
    </Row>
  );
}
