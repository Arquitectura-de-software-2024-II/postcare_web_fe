import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { postRefreshToken } from "./logic/services/userManagementServices";
import { createApikey, deleteSession, updateSession } from "./logic/lib/session";
 
// 1. Specify protected and public routes
const protectedRoutes = /^\/usuario/;
const publicRoutes = ['/', '/auth']
 
export default async function middleware(req: NextRequest) {

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.test(path);
  const isPublicRoute = publicRoutes.includes(path);
 
  // 3. Get the cookie from the cookie
  const cookieStore = await cookies();
  const apikey = cookieStore.get('apikey')
  let session = cookieStore.get('access')
  const refresh = cookieStore.get('refresh')

  if (!apikey){
    await createApikey();
  }

  if (!session && refresh && isProtectedRoute){
    const result = await postRefreshToken(refresh.value);
    if (result.access){
      await updateSession(result.access);
      const updatedCookieStore = await cookies();
      session = updatedCookieStore.get('access')
    }else {
      await deleteSession();
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  //4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session
  ) {

    return NextResponse.redirect(new URL('/usuario', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

