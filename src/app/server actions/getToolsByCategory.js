"use server";
import prisma from "@/src/lib/prisma";

const getToolsByCategory = async ({ category, take }) => {
  const tools = await prisma.app.findMany({
    where: {
      categories: {
        some: { name: category.value },
      },
    },
    take: 10,
  });

  console.log("tools", tools);

  if (tools) {
    return tools;
  } else {
    return null;
  }
};

export default getToolsByCategory;
