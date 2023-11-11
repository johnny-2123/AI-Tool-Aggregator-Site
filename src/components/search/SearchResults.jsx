import getAppsByQueryString from "@/src/app/server actions/getAppsByQueryString";
import ToolCard from "@/src/components/Home Page/ToolCard";
import { ScrollArea } from "@/src/components/ui/scroll-area";

export default async function SearchResults({ query }) {
  console.log("query in searchResults ^^^^^^^^^^^^^^^^", query);
  const tools = await getAppsByQueryString({ query });
  console.log("tools ^^^^^^^^^^^^^^", tools);

  return (
    <div className="flex flex-row flex-wrap justify-between">
      {tools.map((tool) => {
        return <ToolCard key={tool.id} tool={tool} />;
      })}
    </div>
  );
}
