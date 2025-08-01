import { createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  "/new",
  "/repositories/new",
  "/organizations",
  "/notifications",
  "/stars",
  "/watching",
  "/issues",
  "/pulls",
  "/projects",
  "/explore/starred",
  "/user/settings",
];
/* Array of redirect rules for specific routes.
Each rule contains:
- `path` (string): The route to check for a match. If the current request's path matches this value, the rule is evaluated.
- `condition` (function): A predicate function that takes the authenticated `user` object as input and returns a boolean. 
  If the function returns `true`, the redirect is triggered.
- `redirectTo` (string): The destination route to redirect the user to if the `condition` evaluates to `true`.

Usage:
- This array is iterated over in the `updateSession` function.
- For each rule, if the `path` matches the current request's path and the `condition` evaluates to `true`, the user is redirected to the `redirectTo` route.
- Ensure that the `condition` function is robust and handles edge cases (e.g., missing `user_metadata`).

Note:
- The `condition` function assumes that the `user` object is available and properly populated.
- If the `user` object is null or undefined, ensure that the `condition` function handles it gracefully to avoid runtime errors.
*/

const REDIRECTS: {
  path: string;
  condition: (user: User) => boolean;
  redirectTo: string;
}[] = [
  {
    path: "/wizard",
    condition: (user: User) => user.user_metadata.has_completed_wizard,
    redirectTo: "/dashboard",
  },
];

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
            response = NextResponse.next({ request });
          },
        },
      },
    );

    const { data, error } = await supabase.auth.getUser();

    // Redirect if user is not authenticated for protected routes
    if (
      PROTECTED_ROUTES.some((route) =>
        request.nextUrl.pathname.startsWith(route),
      ) &&
      error
    ) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    for (const { path, condition, redirectTo } of REDIRECTS) {
      if (
        data.user &&
        request.nextUrl.pathname === path &&
        condition(data.user)
      ) {
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
    }

    return response;
  } catch (_e) {
    return NextResponse.next({
      request: { headers: request.headers },
    });
  }
};
