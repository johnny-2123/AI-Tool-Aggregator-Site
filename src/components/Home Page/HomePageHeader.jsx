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
    <div className="w-full mt-10 mb-16">
      <h1 className="text-5xl font-extrabold mb-6">AI Tools</h1>
      <div className="w-full">
        {categories.map((category) => (
          <Link key={category} href={`#${category}`}>
            <Badge
              key={category}
              variant={selectedBadge === category ? "default" : "secondary"}
              className="hover:cursor-pointer text-sm mr-2 mb-2"
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
