"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";
import facebookLogo from "@/public/facebook.png";
import { Button } from "@/src/components/ui/button";
import { signIn } from "next-auth/react";

function SignInButton({ provider, logo, label }) {
  const handleClick = () => {
    signIn(provider);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full flex items-center"
      variant={"outline"}
    >
      <Image src={logo} alt={`${label} Logo`} width={20} height={20} />
      <span className="ml-10 w-full flex justify-start">
        <h2> {`Continue with ${label}`}</h2>
      </span>
    </Button>
  );
}

export function GoogleSignInButton() {
  return <SignInButton provider="google" logo={googleLogo} label="Google" />;
}

export function GithubSignInButton() {
  return <SignInButton provider="github" logo={githubLogo} label="Github" />;
}

export function FacebookSignInButton() {
  return (
    <SignInButton provider="facebook" logo={facebookLogo} label="Facebook" />
  );
}
