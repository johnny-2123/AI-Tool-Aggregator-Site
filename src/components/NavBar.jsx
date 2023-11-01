import React from "react";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/src/lib/auth";

const NavBar = async () => {
  const session = await getServerSession(authConfig);
  console.log("session ^^^^^^^^^^^^^^^^^^^^^^^^^^^^", session);
  return (
    <nav className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Home />
        </Link>
        {!session ? (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign in
          </Link>
        ) : (
          <span>Welcome, {session?.user?.name}</span>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
