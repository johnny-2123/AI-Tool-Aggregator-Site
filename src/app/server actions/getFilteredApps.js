import prisma from "@/src/lib/prisma";

const getFilteredApps = async ({ query, category }) => {
  let searchCondition = {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ],
  };

  if (category !== "") {
    searchCondition = {
      AND: [{ categories: { some: { name: category } } }, searchCondition],
    };
  }

  const apps = await prisma.app.findMany({
    where: searchCondition,
    include: {
      categories: true,
    },
  });

  return apps;
};

export default getFilteredApps;
