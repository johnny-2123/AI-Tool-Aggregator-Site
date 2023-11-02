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
import { authConfig } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/src/components/ui/use-toast";
import SubmitImageForm from "@/src/components/form/SubmitImageForm";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  // maybe not necessary since this wont be a form field
  imageUrl: z.string().url("something went wrong"),
  url: z.string().min(1, "URL is required.").url("Must be a valid URL."),
  pricing: z.string().min(1, "pricing is required"),
  isApproved: z.boolean(),
  categories: z.array(z.string()).min(1, "At least one category is required."),
  //maybe not necessary since this wont be a form field
  userId: z.string(),
});

const SubmitToolForm = ({ session }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      pricing: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("values **********************", values);
    // const response = await fetch("/api/tools", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: values.id,
    //     description: values.description,
    //     url: values.url,
    //     pricing: values.pricing,
    //     categories: values.categories,
    //   }),
    // });

    // if (response.ok) {
    //   router.push("/sign-in");
    // } else {
    //   console.error("Submission failed");
    // }
  };

  return (
    <Form {...form}>
      <form className="w-3/5 mx-auto p-10 rounded-md outline-dotted">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>url</FormLabel>
                <FormControl>
                  <Input placeholder="enter tool url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="enter tool title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input placeholder="enter tool description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pricing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pricing</FormLabel>
                <FormControl>
                  <Input placeholder="enter tool pricing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitImageForm />
        </div>
      </form>
    </Form>
  );
};

export default SubmitToolForm;
