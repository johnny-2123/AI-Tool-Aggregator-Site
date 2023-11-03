"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const SignOutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant="ghost"
      className="mt-4 w-2/5 ml-auto mr-2"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
