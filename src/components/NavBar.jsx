import React from "react";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { Home } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Home />
        </Link>
        <Link href="/sign-in" className={buttonVariants()}>
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
