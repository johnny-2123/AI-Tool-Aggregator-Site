import prisma from "@/src/lib/prisma";
import ToolCard from "@/src/components/Home Page/ToolCard";
import getToolsByCategory from "@/src/app/server actions/getToolsByCategory";

const CategorySection = async ({ category }) => {
  const tools = await prisma.app.findMany({
    where: {
      categories: {
        some: { name: category.value },
      },
    },
    take: 10,
  });

  console.log(`************tools for ${category.title}`, tools);
  return (
    <div className="mt-10 w-full">
      <h2 id={category.title} className="text-3xl font-semibold mb-6">
        {category.title}
      </h2>
      <div className="flex flex-row flex-wrap">
        {tools.map((tool) => {
          return <ToolCard key={tool.id} tool={tool} />;
        })}
      </div>
    </div>
  );
};

export default CategorySection;
