"use client";

import React, { useState } from "react";

const SubmitToolForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the state to the first file
  };

  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <input type="file" name="fileInput" onChange={handleFileChange} />
    </div>
  );
};

export default SubmitToolForm;
