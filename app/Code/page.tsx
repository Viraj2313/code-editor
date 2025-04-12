"use client";
import { useState } from "react";
import axios from "axios";
export default function CodePage() {
  const [code, setCode] = useState(
    `#include <stdio.h>\nint main() {\n  printf("Hello, world!");\n  return 0;\n}`
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCompile = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/compile", { code });
      setOutput(res.data.output || "No Output");
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setOutput("Error: " + errorMessage);
    }
    {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex h-full ">
        <div className="flex flex-col flex-1 h-full border-r">
          <div className="bg-gray-200 p-4 flex items-center justify-between  dark:bg-gray-900 border-b border-t">
            <h1>Write Code</h1>
            <p>Language: C</p>
            <button
              onClick={handleCompile}
              className="bg-blue-600 text-white py-2 px-2 hover:bg-blue-700 rounded-md cursor-pointer w-40"
            >
              {loading ? "Compiling..." : "Compile & Run"}
            </button>
          </div>
          <textarea
            className="bg-white flex-1 p-4 dark:bg-gray-900 focus:outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <div className="bg-gray-200 p-4  py-6 flex items-center justify-between dark:bg-gray-900 border-b border-t">
            <h1>Output</h1>
          </div>
          <textarea
            className="bg-gray-50 flex-1 p-4 dark:bg-gray-900 focus:outline-none"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
