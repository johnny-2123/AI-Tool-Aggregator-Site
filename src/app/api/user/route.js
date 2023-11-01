import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email must be at least 1 character.",
    })
    .email("Invalid Email"),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, password } = userSchema.parse(body);

    // check if user with email already in db
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({
      user: rest,
      message: "Succesfully created new user",
    });
  } catch (error) {
    console.log("error&&&&&&&&&&&&&&&&&&&&&&&", error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
