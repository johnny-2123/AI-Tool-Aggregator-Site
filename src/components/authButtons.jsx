"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";
import facebookLogo from "@/public/facebook.png";
import { signIn } from "next-auth/react";

function SignInButton({ provider, logo, label }) {
  const handleClick = () => {
    signIn(provider);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-between h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={logo} alt={`${label} Logo`} width={20} height={20} />
      <span className="ml-10 w-full flex justify-start">
        <h2> {`Continue with ${label}`}</h2>
      </span>
    </button>
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
