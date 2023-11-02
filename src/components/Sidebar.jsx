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
import Image from "next/image";

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
        {/* <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div> */}
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
