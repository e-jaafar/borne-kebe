import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const locale = request.nextUrl.locale || 'fr'
  request.nextUrl.searchParams.set('lang', locale)
  return NextResponse.rewrite(request.nextUrl)
} 