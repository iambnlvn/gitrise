export function getSupabaseErrorMessage(error: string): string {
  const errorMap: Record<string, string> = {
    "Invalid login credentials":
      "The email or password you entered is incorrect. Please try again.",
    "Email not confirmed":
      "Please check your email and click the confirmation link before signing in.",
    "User already registered":
      "An account with this email already exists. Please sign in instead.",
    "Password should be at least 6 characters":
      "Password must be at least 6 characters long.",
    "Unable to validate email address: invalid format":
      "Please enter a valid email address.",
    "Signup is disabled":
      "Account registration is currently disabled. Please contact support.",
    "Email rate limit exceeded":
      "Too many emails sent. Please wait before requesting another confirmation email.",
    "Too many requests":
      "Too many login attempts. Please wait a few minutes before trying again.",
    "Invalid email or password":
      "The email or password you entered is incorrect. Please try again.",
    "Email address not authorized":
      "This email address is not authorized to create an account.",
    "Password is too weak":
      "Please choose a stronger password with at least 8 characters, including uppercase, lowercase, and numbers.",
  };

  return errorMap[error] || error;
}
