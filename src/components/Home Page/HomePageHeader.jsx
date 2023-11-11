"use client";
import { Badge } from "@/src/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

const HomePageHeader = () => {
  return (
    <div className="w-full mt-12 mb-4">
      <h1 class="text-5xl font-extrabold leading-none tracking-tight">
        AI Tools for{" "}
        <span class="underline underline-offset-3 decoration-8 decoration-highlight">
          Content Creators
        </span>
      </h1>
    </div>
  );
};

export default HomePageHeader;
