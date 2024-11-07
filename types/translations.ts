import { translations } from '@/translations'

export type TranslationType = typeof translations
export type LangTranslations = TranslationType[keyof TranslationType]

export type Stat = {
  value: string
  label: string
  description: string
}

export type HomePageTranslations = {
  hero: {
    title: string
    subtitle: string
    cta1: string
    cta2: string
  }
  features: {
    title: string
    subtitle: string
    cta: string
    items: Array<{
      title: string
      description: string
      details: string
    }>
  }
  why: {
    title: string
    description: string
    items: string[]
    cta: string
  }
  reviews: {
    title: string
    items: Array<{
      name: string
      comment: string
    }>
  }
  contact: {
    title: string
    subtitle: string
    cta: string
    floating_button: string
  }
  howItWorks: {
    title: string
    subtitle: string
    steps: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  gallery: {
    title: string
    subtitle: string
  }
  scrollToTop: string
  stats: {
    title: string
    items: Array<{
      value: string
      label: string
      description: string
    }>
  }
}

export type ContactTranslations = {
  contact: {
    title: string
    subtitle: string
  }
  form: {
    name: string
    email: string
    subject: string
    message: string
    submit: string
    success: string
    error: string
    attachment: string
    attachmentTooLarge: string
    invalidFileType: string
  }
  info: {
    title: string
    email: string
    phone: string
    address: string
    hours: string
  }
}

export type Plan = {
  name: string
  price: string
  duration: string
  features: readonly string[]
  cta: string
  popular: boolean
}

export type PricingTranslations = {
  pricing: {
    title: string
    subtitle: string
    popularBadge: string
    plans: readonly Plan[]
  }
}

export type FeatureItem = {
  title: string
  description: string
  details: string
  icon?: string
}

export type FeaturesTranslations = {
  features: {
    title: string
    subtitle: string
    items: readonly FeatureItem[]
  }
} 