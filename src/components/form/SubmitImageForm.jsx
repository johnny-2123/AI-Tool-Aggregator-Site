"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useEdgeStore } from "@/src/lib/edgestore";
import { Progress } from "@/src/components/ui/progress";
import { Input } from "@/src/components/ui/input";
import { Form } from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";

export default function SubmitImageForm() {
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
    <div
      onSubmit={handleSubmit}
      className="w-3/5 mx-auto flex flex-col justify-center space-y-4"
    >
      <Input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
        className="w-2/3 mx-auto"
      />
      <Button type="submit" className="w-2/3 mx-auto">
        Upload
      </Button>
      <Progress value={progress} className="w-2/3 mx-auto" />
    </div>
  );
}
