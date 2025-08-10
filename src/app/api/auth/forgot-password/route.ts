import { type NextRequest, NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { treeifyError } from "zod";
import { AuthApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = forgotPasswordSchema.safeParse(body);
    const origin = (await headers()).get("origin");

    if (!result.success) {
      return NextResponse.json<AuthApiResponse>(
        {
          message: "Validation failed",
          success: false,
          error: {
            message: "Invalid input",
            code: "VALIDATION_ERROR",
            details: JSON.stringify(treeifyError(result.error)),
          },
        },
        { status: 400 },
      );
    }

    const { email } = result.data;

    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/reset-password`,
    });

    if (error) {
      return NextResponse.json<AuthApiResponse>(
        {
          success: false,
          message: "Failed to send reset email",
          error: {
            code: "EMAIL_NOT_SENT",
            details: JSON.stringify(error),
            message:
              error.message ||
              "An error occurred while sending the reset email",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json<AuthApiResponse>({
      success: true,
      message: "Password reset email sent successfully",
      data: { user: null },
      error: {
        code: undefined,
        details: undefined,
        message: "",
      },
    });
  } catch (error) {
    return NextResponse.json<AuthApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: JSON.stringify(error),
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        },
      },
      { status: 500 },
    );
  }
}
