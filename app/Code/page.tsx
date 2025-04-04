"use client"
import { useState } from "react";
import axios from "axios";
export default function CodePage(){
    const [code, setCode] = useState(`#include <stdio.h>\nint main() {\n  printf("Hello, world!");\n  return 0;\n}`);
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const handleCompile=async()=>{
        try{
            setLoading(true);
            const res= await axios.post("/api/compile",{code});
            setOutput(res.data.output||"No Output");

        }catch (error: unknown) {
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
    }
    return (
        <>
        <div className="flex h-full">
      <div className="flex flex-col flex-1 h-full">
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between ">
            <h1>Write Code</h1>
            <p>Language: C</p>
            <button
          onClick={handleCompile}
          className="bg-blue-600 text-white py-2 px-2 hover:bg-blue-700 rounded-md cursor-pointer"
        >
          {loading ? "Compiling..." : "Compile & Run"}
        </button>
        </div>
        <textarea
          className="bg-gray-700 flex-1 text-white p-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        
      </div>
      <div className="flex flex-col flex-1 h-full">
        <div className="bg-gray-800 text-white p-4  py-6 flex items-center justify-between">
            <h1>Output</h1>
            
        </div>
        <textarea
          className="bg-gray-500 flex-1 text-white p-4 "
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        />
        
      </div>
      
    </div>
        </>
    )
}
