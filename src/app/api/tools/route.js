import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/lib/auth";

const toolSchema = z.object({
  url: z.string().min(1, "URL is required.").url("Must be a valid URL."),
  title: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, "Description is required."),
  pricing: z.string().min(1, "pricing is required"),
  category: z
    .array(z.string())
    .refine((value) => value.some((category) => category), {
      message: "You must select at least one category.",
    }),
  imageUrl: z.string().min(1, { message: "image is required" }),
});

export const POST = async (req, res) => {
  const session = await getServerSession(authConfig);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  console.log("session in tools api route", session);

  try {
    const body = await req.json();
    console.log("body in server: ", body);
    const {
      url,
      title,
      description,
      pricing,
      imageUrl,
      category: categoryNames,
    } = toolSchema.parse(body);

    const existingAppByUrl = await prisma.app.findUnique({
      where: { url: url },
    });

    if (existingAppByUrl) {
      return NextResponse.json(
        { message: "Tool with this url already exists" },
        { status: 409 }
      );
    }

    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: categoryNames,
        },
      },
    });
    console.log("categories", categories);

    const newApp = await prisma.app.create({
      data: {
        url,
        title,
        description,
        pricing,
        imageUrl,
        userId: session.user.id,
        categories: {
          connect: categories.map((category) => ({
            id: category.id,
          })),
        },
      },
      include: {
        categories: true,
      },
    });

    console.log("new app", newApp);
    return NextResponse.json({
      message: "New tool submitted",
      tool: newApp,
    });
  } catch (error) {
    console.log("error in server for tool", error);
  }
};
