"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  GoogleSignInButton,
  GithubSignInButton,
  FacebookSignInButton,
} from "@/src/components/authButtons";
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

  const onSubmit = async (values) => {
    //    toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  };

  return (
    <Form {...form}>
      {/* <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-6">
          Sign In
        </Button>
      </form>
   */}
      <h1 className="text-center text-md text-gray-600 mt-2">
        Sign in with one of the following auth providers
      </h1>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mx-4 before:block before:h-px before:flex-grow before:bg-stone-400 "></div>
      <GoogleSignInButton />
      <GithubSignInButton />
      <FacebookSignInButton />
    </Form>
  );
};

export default SignInForm;
