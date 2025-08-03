import { loginSchema } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

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
    const { email, password } = validationResult.data;
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
