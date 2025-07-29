import { NextResponse } from "next/server";
import { Client, Account, ID } from "node-appwrite";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_API_KEY!);

  try {
    const account = new Account(client);

    // Create user account (no email verification)
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    return NextResponse.json({ 
      success: true, 
      userId: user.$id 
    });

  } catch (error: any) {
    console.error("Signup error:", {
      message: error.message,
      code: error.code,
      type: error.type,
    });

    return NextResponse.json(
      { 
        success: false, 
        message: error.type === 'user_already_exists' 
          ? "Email already registered" 
          : "Signup failed. Please try again."
      },
      { status: 400 }
    );
  }
}
