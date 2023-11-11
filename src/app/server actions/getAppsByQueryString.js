"use server";

import prisma from "@/src/lib/prisma";

const getAppsByQueryString = async ({ query }) => {
  console.log("search string in server action^^^^^^^^^^^", query);
  const apps = await prisma.app.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return apps;
};

export default getAppsByQueryString;
