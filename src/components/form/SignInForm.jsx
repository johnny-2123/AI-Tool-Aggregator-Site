"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from "@/src/components/ui/separator";
import {
  GoogleSignInButton,
  GithubSignInButton,
  FacebookSignInButton,
} from "@/src/components/authButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { toast } from "@/src/components/ui/use-toast";

const FormSchema = z.object({
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

const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form} className="">
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-center pb-1">Sign in</CardTitle>
          <CardDescription className="mx-auto">
            Using any of the following providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          <div className="space-y-2">
            <GoogleSignInButton />
            <GithubSignInButton />
            <FacebookSignInButton />
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default SignInForm;
