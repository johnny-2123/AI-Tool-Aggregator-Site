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
  FormDescription,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { useToast } from "@/src/components/ui/use-toast";
import { useEdgeStore } from "@/src/lib/edgestore";
import findToolByUrl from "@/src/app/server actions/toolAlreadyExists";

const categoryNames = [
  {
    id: "AUDIO",
    label: "Audio",
  },
  {
    id: "VISUAL",
    label: "Visual",
  },
  {
    id: "WRITING",
    label: "Writing",
  },
  {
    id: "FACT_CHECKING",
    label: "Fact Checking",
  },
  {
    id: "SEO",
    label: "SEO",
  },
  {
    id: "TRANSLATION",
    label: "Translation",
  },
  {
    id: "OTHER",
    label: "Other",
  },
];

const FormSchema = z.object({
  url: z.string().min(1, "URL is required.").url("Must be a valid URL."),
  title: z
    .string()
    .min(1, {
      message: "title is required",
    })
    .max(20, "Title must be less that 20 characters"),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(220, "Description must be less that 220 characters"),
  pricing: z.string().min(1, "pricing is required"),
  category: z
    .array(z.string())
    .refine((value) => value.some((category) => category), {
      message: "You must select at least one category.",
    }),
});

const SubmitToolForm = ({ session }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      pricing: "",
      category: [],
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileError("");
    }
  };

  const imageUpload = async () => {
    if (file) {
      const res = await edgestore.myPublicImages.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
          console.log(progress);
        },
      });
      console.log(res);
      if (res.url) {
        return res.url;
      } else {
        throw new Error({
          message: "Something went wrong while uploading image",
        });
      }
    }
  };

  const onSubmit = async (values) => {
    if (!file) {
      setFileError("An image file is required.");
      return;
    }

    try {
      const toolAlreadyExists = await findToolByUrl(values.url);
      toast({ title: "Tool with this url already exists" });
      if (toolAlreadyExists) return;
    } catch (error) {
      console.log(error);
    }

    toast({ title: "uploading submission..." });

    try {
      const edgeImageUrl = await imageUpload();

      const toolBody = {
        url: values.url,
        title: values.title,
        description: values.description,
        pricing: values.pricing,
        imageUrl: edgeImageUrl,
        userId: session?.user?.id,
        category: values.category,
      };

      const response = await fetch("/api/tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toolBody),
      });

      if (response.ok) {
        const res = await response.json();
        toast({ title: "Your tool has been submitted for review" });

        form.reset({
          url: "",
          title: "",
          description: "",
          pricing: "",
          category: [],
        });
        setFile(null);
        router.push("/");
      } else {
        const res = await response.json();
        toast({ title: res.message });
      }
    } catch (error) {
      toast({ title: "Something went wrong" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-11/12 mx-auto p-10 rounded-md border-2 border-primary my-4"
      >
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight">
          <span class="underline underline-offset-3 decoration-8 decoration-accent">
            Submit Tool For Review
          </span>
        </h1>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
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
                <FormLabel>Title</FormLabel>
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="enter tool description" {...field} />
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
                <FormLabel>Pricing</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FREE">Free</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="SUBSCRIPTION">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Category</FormLabel>
                  <FormDescription>
                    Select relevant app categories
                  </FormDescription>
                </div>
                {categoryNames.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="category"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>{`Image`}</FormLabel>
            <FormDescription>
              Please select a valid image file (PNG or JPEG).
            </FormDescription>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full mx-auto mb-0"
            />
            {fileError && (
              <p className="text-sm font-medium text-destructive pt-0">
                {fileError}
              </p>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full mx-auto mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SubmitToolForm;
