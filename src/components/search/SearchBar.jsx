"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Badge } from "@/src/components/ui/badge";
import { Search } from "lucide-react";

export default function SearchBar({ push, category }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = useRouter();

  const [selectedBadge, setSelectedBadge] = useState(category);
  const [term, setTerm] = useState("");

  const categories = [
    { title: "Writing", value: "WRITING" },
    { title: "Audio", value: "AUDIO" },
    { title: "Visual", value: "VISUAL" },
    { title: "Fact Checking", value: "FACT_CHECKING" },
    { title: "SEO", value: "SEO" },
    { title: "Translation", value: "TRANSLATION" },
    { title: "Other", value: "OTHER" },
  ];

  const handleCategoryClick = (selectedCategory) => {
    if (selectedBadge === selectedCategory) {
      // If the selected badge is the same as the clicked badge, deselect it.
      setSelectedBadge(null);

      // Remove the category from the search params.
      const params = new URLSearchParams(searchParams);
      params.delete("category");

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      if (push) {
        router.push(`/search?${params.toString()}`);
      } else {
        replace(`/search?${params.toString()}`);
      }
    } else {
      setSelectedBadge(selectedCategory);

      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      params.set("category", selectedCategory);

      if (push) {
        router.push(`/search?${params.toString()}`);
      } else {
        replace(`/search?${params.toString()}`);
      }
    }
  };

  const handleSearch = useDebouncedCallback((input) => {
    setTerm(input);

    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set("query", input);
    } else {
      params.delete("query");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (push) {
      router.push(`/search?${params.toString()}`);
    } else {
      replace(`/search?${params.toString()}`);
    }
  }, 300);

  return (
    <div className="flex flex-col  w-full pt-2 mt-2 mr-4">
      <div className="mb-2 relative flex">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={"search tools..."}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="w-full mt-2s">
        {categories.map((categoryItem) => (
          <Badge
            key={categoryItem.value}
            variant={
              selectedBadge === categoryItem.value ? "default" : "secondary"
            }
            className="hover:cursor-pointer text-md mr-2 mb-2"
            onClick={() => handleCategoryClick(categoryItem.value)}
          >
            {categoryItem.title}
          </Badge>
        ))}
      </div>
    </div>
  );
}
