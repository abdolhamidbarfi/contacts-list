"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContacts } from "./useContacts";
import { getColorByChar } from "@/lib/getColorByChar";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/Modal";
import { useState } from "react";

interface ContactCardProps {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
}

export default function ContactCard({
  id,
  name,
  phone,
  avatarUrl,
}: ContactCardProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useRouter();
  const { dispatchDeleteContact } = useContacts();
  function handleClickCard(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const target = e.currentTarget as HTMLDivElement;
    // if (target.id) {
    navigate.push(`${target.id}`);
    // }
  }

  const color = getColorByChar(name[0], "bg");
  return (
    <>
      <Card
        className="flex items-center justify-between p-4 w-full cursor-pointer"
        onClick={handleClickCard}
        id={id}
      >
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={name} />
            ) : (
              <AvatarFallback className={cn(color, "text-black")}>
                {name[0]}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium text-lg">{name}</span>
            <span className="text-md text-muted-foreground">{phone}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              dir="rtl"
              asChild
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <Link href={`${id}/edit`}>ویرایش</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              dir="rtl"
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
              className="cursor-pointer"
            >
              حذف مخاطب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      {openModal && (
        <Dialog.Root defaultOpen>
          <Dialog.Content>
            <Dialog.Title>تایید حذف</Dialog.Title>
            <Dialog.Description>
              آیا مطمئن هستید می‌خواهید این مخاطب را حذف کنید؟
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Cancel>انصراف</Dialog.Cancel>
              <Dialog.Action
                onClick={() => {
                  dispatchDeleteContact(id);
                  setOpenModal(false);
                }}
                variant="destructive"
              >
                حذف
              </Dialog.Action>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
