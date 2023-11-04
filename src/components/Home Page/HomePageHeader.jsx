"use client";
import { Badge } from "@/src/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

const HomePageHeader = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const categories = [
    "Writing",
    "Audio",
    "Visual",
    "Fact Checking",
    "SEO",
    "Translation",
    "Other",
  ];

  return (
    <div className="w-full mt-12 mb-14">
      <h1 class="mb-6 text-5xl font-extrabold leading-none tracking-tight">
        AI Tools for{" "}
        <span class="underline underline-offset-3 decoration-8 decoration-highlight">
          Content Creators
        </span>
      </h1>
      <div className="w-full">
        {categories.map((category) => (
          <Link key={category} href={`#${category}`}>
            <Badge
              key={category}
              variant={selectedBadge === category ? "default" : "secondary"}
              className="hover:cursor-pointer text-md mr-2 mb-2"
              onClick={() => setSelectedBadge(category)}
            >
              {category}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePageHeader;
