import React from "react";
import SignOutButton from "@/src/components/SignOutButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const SideBar = ({ session }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="hover:cursor-pointer">
        <Image
          src={`${session.user.image}`}
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> {session?.user?.name}</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Link
            href={`/tools/new`}
            className="flex justify-between items-center gap-4"
          >
            <PlusCircle />
            <Label htmlFor="name" className="text-right">
              Submit New Tool
            </Label>
          </Link>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <SignOutButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
