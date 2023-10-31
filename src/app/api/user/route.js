import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    return NextResponse.json(body);
  } catch (error) {}
};
