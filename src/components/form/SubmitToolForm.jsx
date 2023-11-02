"use client";

import * as React from "react";
import { useState } from "react";
import { useEdgeStore } from "@/src/lib/edgestore";
import { Progress } from "@/src/components/ui/progress";
import { Input } from "@/src/components/ui/input";
import { Form } from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";

export default function Page() {
  const [file, setFile] = React.useState(null);
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    }
  };

  return (
    <Form
    // className="flex flex-col items-center w-3/5 mx-auto"
    >
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <Button type="submit">Upload</Button>
        <Progress value={progress} />
      </form>
    </Form>
  );
}
