"use client";

import * as React from "react";
import { useState } from "react";
import { useEdgeStore } from "@/src/lib/edgestore";
import { Progress } from "@/src/components/ui/progress";
import { Input } from "@/src/components/ui/input";

export default function Page() {
  const [file, setFile] = React.useState(null);
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  return (
    <div className="flex flex-col items-center w-3/5 mx-auto">
      <Input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                setProgress(progress);
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
          }
        }}
      >
        Upload
      </button>
      <Progress value={progress} />
    </div>
  );
}
