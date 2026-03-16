// import { auth } from "@/auth";
// // export { auth as middleware } from "@/auth";
// import { NextResponse } from "next/server";

// // Routes that require authentication
// const protectedRoutes = ["/account", "/courses"];

// export default auth((req) => {
//   const { nextUrl, auth: session } = req;
//   const isLoggedIn = !!session;

//   const isProtected = protectedRoutes.some((route) =>
//     nextUrl.pathname.startsWith(route)
//   );

//   // Redirect unauthenticated users trying to access protected routes
//   if (isProtected && !isLoggedIn) {
//     const signInUrl = new URL("/sign-in", nextUrl.origin);
//     signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
//     return NextResponse.redirect(signInUrl);
//   }

//   // Redirect logged-in users away from auth pages
//   if (isLoggedIn && (nextUrl.pathname === "/sign-in" || nextUrl.pathname === "/register")) {
//     return NextResponse.redirect(new URL("/account", nextUrl.origin));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };


import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/account"];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isProtected = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Redirect unauthenticated users trying to access protected routes
  if (isProtected && !isLoggedIn) {
    const signInUrl = new URL("/sign-in", nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect logged-in users away from auth pages
  // if (isLoggedIn && (nextUrl.pathname === "/sign-in" || nextUrl.pathname === "/register")) {
  //   return NextResponse.redirect(new URL("/account", nextUrl.origin));
  // }
  // Redirect logged-in users away from auth pages
if (isLoggedIn && (nextUrl.pathname === "/sign-in" || nextUrl.pathname === "/register")) {
  const userRole = (session as { user?: { role?: string } })?.user?.role;
  const redirectTo = userRole === "admin" ? "/admin" : "/account";
  return NextResponse.redirect(new URL(redirectTo, nextUrl.origin));
}

  // Forward pathname as header so layout.tsx can conditionally hide Navbar/Footer
  const response = NextResponse.next({
    request: {
      headers: new Headers({
        ...Object.fromEntries(req.headers),
        "x-pathname": nextUrl.pathname,
      }),
    },
  });

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};