import { Home } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/src/lib/auth";
import SignOutButton from "./SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";

const NavBar = async () => {
  const session = await getServerSession(authConfig);
  return (
    <nav className="bg-zinc-100 py-2 border-b border-s-zinc-200 w-full z-10">
      <div className="container flex items-center justify-between w-11/12 px-0">
        <Link href="/">
          <Home className="w-7 h-7" />
        </Link>
        {!session ? (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign in
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={`${session.user.image}`}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col justify-center w-60">
              <DropdownMenuLabel className="flex justify-center text-base">
                {session?.user?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="mb-2" />
              <Link
                href="/tools/new"
                className="w-full flex justify-center items-center"
              >
                <PlusCircle className="mr-2" size={20} />{" "}
                <span>Submit Tool</span>
              </Link>
              <DropdownMenuSeparator className="mb-0 mt-2" />
              <SignOutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
