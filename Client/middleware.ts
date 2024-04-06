import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./components/features/storeToken";
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
    const myCookie = await getToken()
    let token = myCookie?.value
    console.log(token)
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
