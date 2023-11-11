import SearchBar from "@/src/components/search/SearchBar";
import SearchResults from "@/src/components/search/SearchResults";
import { ScrollArea } from "@/src/components/ui/scroll-area";
export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";
  console.log("query string in searh page", query);
  return (
    <div className="w-11/12 py-0">
      <div className="flex items-end mb-6">
        <h1 class="mb-2 mt-4 mr-4 text-5xl font-extrabold leading-none tracking-tight">
          <span class="underline underline-offset-3 decoration-8 decoration-highlight">
            Search
          </span>
        </h1>{" "}
        <SearchBar />
      </div>

      <SearchResults query={query} />
    </div>
  );
}
