import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path.startsWith("/admin")) {
    if (path === "/admin/login") {
      return NextResponse.next()
    }

    const adminAuthenticated = request.cookies.get("adminAuthenticated")
    if (adminAuthenticated !== "true") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

