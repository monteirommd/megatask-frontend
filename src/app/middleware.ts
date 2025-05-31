import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const token = request.cookies.get('token')?.value;

    const isAuth = !!token;
    const inOnLoginPage = request.nextUrl.pathname === '/login';
    const inOnRegisterPage = request.nextUrl.pathname === '/register';

    if(!isAuth && !inOnLoginPage && !inOnRegisterPage){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(isAuth && (inOnLoginPage || inOnRegisterPage)){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}