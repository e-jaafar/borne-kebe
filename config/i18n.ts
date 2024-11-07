export const languages = ['fr', 'en', 'nl'] as const
export type Lang = (typeof languages)[number]
export const defaultLang = 'fr'

export function isValidLang(lang: string): lang is Lang {
  return languages.includes(lang as Lang)
} 