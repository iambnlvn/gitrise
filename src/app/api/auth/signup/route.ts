import { type NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations/auth";
import { createClient } from "@/utils/supabase/server";
import { getAuthErrorMessage } from "@/lib/supabase-errors";
import { treeifyError } from "zod";
import { AuthApiResponse, AuthErrorCode } from "@/types/api";
import { headers } from "next/headers";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = treeifyError(validationResult.error);
      return NextResponse.json<AuthApiResponse>(
        {
          success: false,
          error: {
            message: "Validation failed",
            details: JSON.stringify(errors),
          },
        },
        { status: 400 },
      );
    }

    const { email, password, username } = validationResult.data;

    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: username,
        },
        emailRedirectTo: `${origin}/api/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json<AuthApiResponse>(
        {
          success: false,
          error: {
            message: getAuthErrorMessage(error.code as AuthErrorCode),
            code: error.code,
            details: JSON.stringify(error),
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json<AuthApiResponse>({
      success: true,
      data: {
        user: data.user,
      },
      message: "Please check your email to confirm your account",
    });
  } catch (error) {
    return NextResponse.json<AuthApiResponse>(
      {
        success: false,
        error: {
          message: "Something went wrong. Please try again.",
          details: JSON.stringify(error),
          code: "internal_server_error",
        },
      },
      { status: 500 },
    );
  }
}
