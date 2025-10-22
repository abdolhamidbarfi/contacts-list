"use client";
import { User } from "lucide-react";
import { Row } from "@/components/ui/row";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProfileProps {
  name?: string;
  phone?: string;
  email?: string;
  avatar?: string | null;
}

export default function SingleContact({
  name,
  phone,
  email,
  avatar = null,
}: ProfileProps) {
  return (
    <Row direction="column" align="center" className="mt-16 " maxWidth="7xl">
      <div className="w-full mt-20">
        <div className="flex flex-col items-center space-y-2 mb-14 w-full">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          <h2 className="text-lg font-semibold">حمید برفی</h2>
        </div>

        <div className=" flex justify-between border-border border-gray-200 border-b py-5 ">
          <span className="font-medium">شماره تماس: </span>
          <span>09392752406</span>
        </div>
        <div className="py-5 flex justify-between">
          <span className="font-medium">ایمیل:</span>
          <span> barfiabdolhamid@gmail.com</span>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <Row>
            <Button size="lg">
              <Link href="/2568/edit">ویرایش</Link>
            </Button>

            <Button variant="outline" size="lg">
              حذف
            </Button>
          </Row>
        </div>
      </div>
    </Row>
  );
}
