"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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

interface ContactCardProps {
  name: string;
  phone: string;
  avatarUrl?: string;
}

export default function ContactCard({
  name,
  phone,
  avatarUrl,
}: ContactCardProps) {
  const navigate = useRouter();
  function handleClickCard(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const target = e.currentTarget as HTMLDivElement;
    // if (target.id) {
    navigate.push(`${target.id}`);
    // }
  }
  return (
    <Card
      className="flex items-center justify-between p-4 w-full cursor-pointer"
      onClick={handleClickCard}
      id="25555555"
    >
      {/* آواتار و اطلاعات */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback>{name[0]}</AvatarFallback>
          )}
        </Avatar>

        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-sm text-muted-foreground">{phone}</span>
        </div>
      </div>

      {/* دکمه سه نقطه */}
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
            <Link href="/2536/edit">ویرایش</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            dir="rtl"
            onClick={(e) => {
              alert("Deleted contacts");
              e.stopPropagation();
            }}
            className="cursor-pointer"
          >
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
