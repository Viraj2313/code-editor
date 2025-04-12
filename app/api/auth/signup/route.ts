import axios from "axios";
import { db } from "@/app/lib/db";
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if ((rows as any[]).length > 0) {
      return new Response("Email already registered", { status: 400 });
    }
    await db.query("INSERT INTO Users (Name,Email,Password) VALUES (?,?,?)", [
      name,
      email,
      password,
    ]);
    return new Response("Sign up success", { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(errorMessage, { status: 500 });
  }
}
