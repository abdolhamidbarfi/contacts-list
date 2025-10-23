"use client";
import { User } from "lucide-react";
import { Row } from "@/components/ui/row";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContacts } from "./useContacts";
import { getColorByChar } from "@/lib/getColorByChar";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/Modal";
import { useDocumentTitle } from "@/hooks/seDocumentTitle";

export default function SingleContact() {
  const { contactId } = useParams();
  const { getContactById, dispatchDeleteContact } = useContacts();
  const navigate = useRouter();
  const contact = getContactById(contactId as string);

  useDocumentTitle(contact ? `${contact.name} | دفترچه مخاطبین` : "");

  function handleDeleteContact() {
    dispatchDeleteContact(contact?.id as string);
    navigate.replace("/");
  }

  const color = getColorByChar(contact?.name[0] as string, "bg");
  return (
    <Row direction="column" align="center" className="mt-16 " maxWidth="7xl">
      <div className="w-full mt-20">
        <div className="flex flex-col items-center space-y-2 mb-20 w-full">
          <div
            className={cn(
              "w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center",
              color
            )}
          >
            {contact?.avatar ? (
              <img
                src={contact?.avatar}
                alt={contact?.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <User
                className={cn(
                  "w-12 h-12 text-muted-foreground text-gray-700",
                  color
                )}
              />
            )}
          </div>
          <h2 className="font-semibold text-2xl pt-4">{contact?.name}</h2>
        </div>

        <div className=" flex justify-between border-border border-gray-200 border-b py-5 text-xl">
          <span className="font-medium">شماره تماس: </span>
          <span>{contact?.phone}</span>
        </div>

        <div className="py-5 flex justify-between text-xl">
          <span className="font-medium">ایمیل:</span>
          <span>{contact?.email || "ایمیل وارد نشده است"}</span>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <Row>
            <Button size="lg" asChild>
              <Link href={`${contact?.id}/edit`}>ویرایش</Link>
            </Button>

            <Dialog.Root>
              <Dialog.Trigger className="px-4 py-2 bg-red-500 text-white rounded-md">
                حذف مخاطب
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Title>تایید حذف</Dialog.Title>
                <Dialog.Description>
                  آیا مطمئن هستید می‌خواهید این مخاطب را حذف کنید؟
                </Dialog.Description>
                <Dialog.Actions>
                  <Dialog.Cancel>انصراف</Dialog.Cancel>
                  <Dialog.Action
                    onClick={handleDeleteContact}
                    variant="destructive"
                  >
                    حذف
                  </Dialog.Action>
                </Dialog.Actions>
              </Dialog.Content>
            </Dialog.Root>
          </Row>
        </div>
      </div>
    </Row>
  );
}
