"use server";

import prisma from "@/src/lib/prisma";

const getFilteredApps = async ({ query, category }) => {
  console.log("search string in server action^^^^^^^^^^^", query);
  console.log("category  in server action^^^^^^^^^^^", category);

  const apps = await prisma.app.findMany({
    where: {
      AND: [
        { categories: { some: { name: category } } },
        {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
          ],
        },
      ],
    },
    include: {
      categories: true,
    },
  });
  return apps;
};

export default getFilteredApps;
