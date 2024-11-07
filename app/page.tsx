import { redirect } from 'next/navigation'
import { defaultLang } from '@/config/i18n'

export default function Home() {
  redirect(`/${defaultLang}`)
}