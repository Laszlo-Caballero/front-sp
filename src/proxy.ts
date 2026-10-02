import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./lib/jwt-cookie";
import { instance } from "./lib/axios";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path == "/auth") {
    return NextResponse.next();
  }

  const cookie = await getCookie();
  if (!cookie) {
    req.nextUrl.pathname = "/auth";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    const res = await instance.get("/auth/revalidate", {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    return NextResponse.next();
  } catch (error) {
    req.nextUrl.pathname = "/auth";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
