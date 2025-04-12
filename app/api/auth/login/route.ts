import { db } from "@/app/lib/db";
export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const [rows]: any[] = await db.query(
      "SELECT * FROM users WHERE Email = ? AND Password = ?",
      [email, password]
    );

    if (rows.length == 0) {
      return new Response("Invalid email or password", { status: 400 });
    }
    return new Response("Login success", { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(errorMessage, { status: 500 });
  }
}
