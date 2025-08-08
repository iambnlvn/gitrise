import { type NextRequest, NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { createClient } from "@/utils/supabase/server";
import { AuthApiResponse } from "@/types/api";
import { treeifyError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);

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

    const { password, token } = result.data;

    if (!token) {
      return NextResponse.json<AuthApiResponse>(
        {
          success: false,
          message: "Reset token is required",
          error: {
            code: "MISSING_TOKEN",
            message: "Reset token is required",
            details: "No reset token provided",
          },
        },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return NextResponse.json<AuthApiResponse>(
        {
          success: false,
          message: "Failed to reset password",
          error: {
            code: "RESET_PASSWORD_FAILED",
            details: JSON.stringify(error),
            message:
              error.message || "An error occurred while resetting password",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return NextResponse.json<AuthApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: JSON.stringify(error),
          message: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 },
    );
  }
}
