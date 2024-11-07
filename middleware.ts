import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages, defaultLang, type Lang } from '@/config/i18n'

// Amélioration du typage et de la validation des langues
function getLocaleFromHeader(request: NextRequest): Lang {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLang

  const browserLocales = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim())
    .map(lang => lang.substring(0, 2).toLowerCase())

  const matchedLocale = browserLocales.find(
    (lang): lang is Lang => languages.includes(lang as Lang)
  )
  
  return matchedLocale || defaultLang
}

// Ajout de constantes pour les headers de sécurité
const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "img-src 'self' data: https: *.amazonaws.com",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "connect-src 'self' https://api.your-domain.com",
    "frame-ancestors 'none'"
  ].join('; ')
}

// Ajout d'une fonction helper pour vérifier les paths à ignorer
const shouldIgnorePath = (pathname: string): boolean => {
  const ignorePaths = [
    '/_next',
    '/api',
    '/static',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
  ]
  return ignorePaths.some(path => pathname.startsWith(path)) || pathname.includes('.')
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Appliquer les headers de sécurité
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  const pathname = request.nextUrl.pathname

  // Vérifier si le path doit être ignoré
  if (shouldIgnorePath(pathname)) {
    return response
  }

  try {
    // Récupérer la langue préférée
    const savedLang = request.cookies.get('preferred-lang')?.value as Lang | undefined
    const preferredLang = savedLang || getLocaleFromHeader(request)

    // Redirection racine
    if (pathname === '/') {
      const response = NextResponse.redirect(new URL(`/${preferredLang}`, request.url))
      response.cookies.set('preferred-lang', preferredLang, {
        maxAge: 60 * 60 * 24 * 365, // 1 an
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      return response
    }

    // Vérifier et rediriger si nécessaire
    const hasValidLocale = languages.some(locale => 
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (!hasValidLocale) {
      const response = NextResponse.redirect(
        new URL(`/${preferredLang}${pathname}`, request.url)
      )
      response.cookies.set('preferred-lang', preferredLang, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      return response
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return response
  }
}

export const config = {
  matcher: [
    // Mise à jour du matcher pour plus de précision
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)' 
  ]
} 