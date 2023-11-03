import { NextResponse } from "next/server";

export function authMiddleware(req) {
  const userIsAuthenticated = checkUserAuthentication();

  if (!userIsAuthenticated) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
