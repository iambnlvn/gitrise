import { type NextRequest, NextResponse } from "next/server";

import { signupSchema } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseErrorMessage } from "@/lib/supabase-errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = Object.entries(validationResult.error).map((err) => ({
        field: err[0],
        message: err[1],
      }));
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    const { email, password, username } = validationResult.data;
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: username,
        },
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });

    if (error) {
      return NextResponse.json(
        {
          error: getSupabaseErrorMessage(error.message),
          code: error.code,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      user: data.user,
      message: "Please check your email to confirm your account",
    });
  } catch (error) {
    console.error("[v0] Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
