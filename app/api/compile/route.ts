import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {code} = await req.json();
    try{
        const submission = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",{
            language_id: 50,
            source_code:code,
        },{
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
              },
        })
        const result =submission.data;
        return NextResponse.json({
            output:result.stdout || result.stderr || "No Output",
        })
    }catch (error: unknown) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
    
        return NextResponse.json(
            { output: "Error compiling code", error: errorMessage },
            { status: 500 }
        );
    }
    
}