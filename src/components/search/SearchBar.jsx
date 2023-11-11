"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ push }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`searching....... ${term}`);

    const params = new URLSearchParams(searchParams);
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
  }, 300);

  return (
    <div className="relative flex w-full h-12 mr-4">
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
  );
}
