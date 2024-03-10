// External Dependencies
import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-up", "/sign-in"],

  async afterAuth(auth, req, event) {
    if (auth.userId && auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/repositories", req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
