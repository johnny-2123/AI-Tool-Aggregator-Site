"use client";
import { Badge } from "@/src/components/ui/badge";
import { useState } from "react";

const HomePageHeader = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const badges = [
    "Writing",
    "Audio",
    "Visual",
    "Fact Checking",
    "SEO",
    "Translation",
    "Other",
  ];

  return (
    <div className="w-full mt-2 mb-10">
      <h1 className="text-4xl font-extrabold mb-4">AI Tools</h1>
      <div className="w-full">
        {badges.map((badge) => (
          <Badge
            key={badge}
            variant={selectedBadge === badge ? "default" : "secondary"}
            className="hover:cursor-pointer text-sm mr-2"
            onClick={() => setSelectedBadge(badge)}
          >
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default HomePageHeader;
