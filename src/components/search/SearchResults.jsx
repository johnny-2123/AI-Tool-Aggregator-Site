import getFilteredApps from "@/src/app/server actions/getFilteredApps";
import ToolCard from "@/src/components/Home Page/ToolCard";
import { ScrollArea } from "@/src/components/ui/scroll-area";

export default async function SearchResults({ query, category }) {
  console.log("query in searchResults ^^^^^^^^^^^^^^^^", query);
  console.log("category in searchResults ^^^^^^^^^^^^^^^^", category);

  const tools = await getFilteredApps({ query, category });

  return (
    <div className="flex flex-row flex-wrap">
      {tools.map((tool) => {
        return <ToolCard key={tool.id} tool={tool} />;
      })}
    </div>
  );
}
