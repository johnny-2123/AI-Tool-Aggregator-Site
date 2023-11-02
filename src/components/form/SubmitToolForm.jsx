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
import { redirect } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { toast } from "@/src/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useEdgeStore } from "@/src/lib/edgestore";
import { Progress } from "@/src/components/ui/progress";

const FormSchema = z.object({
  url: z.string().min(1, "URL is required.").url("Must be a valid URL."),
  title: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, "Description is required."),
  pricing: z.string().min(1, "pricing is required"),
  //   categories: z.array(z.string()).min(1, "At least one category is required."),
});

const SubmitToolForm = ({ session }) => {
  console.log("session in submit tool form", session);

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [edgeImageUrl, setEdgeImageUrl] = useState("");
  const { edgestore } = useEdgeStore();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      pricing: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("values **********************", values);

    if (file) {
      const res = await edgestore.myPublicImages.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
          console.log(progress);
        },
      });
      // run some server action or api here
      // to add the necessary data to your database
      console.log(res);
      setEdgeImageUrl(res.url);
    }

    const toolBody = {
      url: values.url,
      title: values.title,
      description: values.description,
      pricing: values.pricing,
      imageUrl: edgeImageUrl,
      userId: session?.user?.id,
      categories: values.categories,
    };

    console.log("tool body", toolBody);

    // const response = await fetch("/api/tools", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(toolBody),
    // });

    // if (response.ok) {
    //   router.push("/sign-in");
    // } else {
    //   console.error("Submission failed");
    // }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-3/5 mx-auto p-10 rounded-md outline-dotted"
      >
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
          <Input
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
            className="w-full mx-auto"
          />
        </div>
        <Button type="submit" className="w-full mx-auto mt-2">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SubmitToolForm;
