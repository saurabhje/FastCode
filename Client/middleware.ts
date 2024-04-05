import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const loggedInRoutes = ["/profile"];
const loggedOutRoutes = ["/login", "/register"];

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  if (
    !loggedInRoutes.some((path) =>
      req.nextUrl.pathname.startsWith(path)
    ) &&
    !loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next();
  } else {
    const myCookie = cookies().get('accessToken');
    let token = myCookie?.value

    if (
      !token &&
      loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      return NextResponse.redirect(`${process.env.LOGIN}`);
    } else if (
      token &&
      loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      return NextResponse.redirect(`${process.env.DASHBOARD}`);
    }
  }

  return NextResponse.next();
}
