import { getAuthErrorMessage } from "@/lib/supabase-errors";
import { loginSchema } from "@/lib/validations/auth";
import { AuthApiResponse, AuthErrorCode } from "@/types/api";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = treeifyError(validationResult.error);
      return NextResponse.json<AuthApiResponse>(
        {
          success: false,
          error: {
            message: "Validation failed",
            details: JSON.stringify(errors),
            code: "validation_error",
          },
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
    });
  } catch {
    return NextResponse.json<AuthApiResponse>(
      {
        success: false,
        error: {
          message: "Internal server error",
          code: "internal_server_error",
        },
      },
      { status: 500 },
    );
  }
}
