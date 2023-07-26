import { NextResponse, userAgent, NextRequest } from 'next/server'

// Set pathname where middleware will be executed
// export const config = {
//   matcher: ['/', ]
// }

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      "/((?!.*\\.|api|_next/static|_next/image|favicon.ico\\/).*)"
      // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }


export function middleware(NextRequest) {
  // Parse user agent
  const { device } = userAgent(NextRequest)

  // Getting country code
  let userCountry = NextRequest.geo?.country ?? ""

  // Check darkMode cookie
  // let darkModeCookie = NextRequest.cookies.get('LightMode')?.value;


  const originalPathName = NextRequest.nextUrl.pathname
  
  // Check the viewport
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  // const viewport = 'mobile'
  
  //Update the expected url
  NextRequest.nextUrl.searchParams.set('LightMode', "darkModeCookie")
  NextRequest.nextUrl.searchParams.set('UserCountryCode', userCountry)
  NextRequest.nextUrl.pathname = `/${viewport}${originalPathName}`

  // Return rewritten response
  return NextResponse.rewrite(NextRequest.nextUrl)

}