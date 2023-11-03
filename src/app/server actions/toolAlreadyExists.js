"use server";
import prisma from "@/src/lib/prisma";

const findToolByUrl = async (url) => {
  const existingAppByUrl = await prisma.app.findUnique({
    where: { url: url },
  });

  if (existingAppByUrl) {
    return true;
  } else {
    return false;
  }
};

export default findToolByUrl;
