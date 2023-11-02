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
