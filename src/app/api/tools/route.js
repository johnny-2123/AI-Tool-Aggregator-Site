import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

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
      message: "You have to select at least one categories.",
    }),
});

export const POST = async (req) => {
  try {
    const body = await req.json();
    console.log("body in server: ", body);
    const { url, title, description, pricing, imageUrl, categoryIds } = body;
    return NextResponse.json({
      message: "hello from tool route",
    });
  } catch (error) {
    console.log("error in server for tool", error);
  }
};
