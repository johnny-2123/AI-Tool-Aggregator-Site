import SearchBar from "@/src/components/search/SearchBar";
import SearchResults from "@/src/components/search/SearchResults";
import { ScrollArea } from "@/src/components/ui/scroll-area";
export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";
  console.log("query string in searh page", query);

  const category = searchParams?.category || "";
  console.log("category in searh page", category);

  return (
    <div className="w-11/12 py-0">
      <div className="flex items-start md:flex-col mt-2 mb-4">
        <h1 className="mr-4 text-5xl font-extrabold leading-none tracking-tight">
          <span className="underline underline-offset-3 decoration-8 decoration-highlight">
            Search
          </span>
        </h1>{" "}
        <SearchBar category={category} />
      </div>
      <SearchResults query={query} category={category} />
    </div>
  );
}
