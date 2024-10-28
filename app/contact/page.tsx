'use client'

// import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useLang } from "@/context/LangContext"

const translations = {
  fr: {
    title: "Contactez-nous",
    subtitle: "Notre équipe est là pour vous aider",
    form: {
      name: "Votre nom",
      email: "Votre email",
      subject: "Sujet",
      message: "Votre message",
      submit: "Envoyer le message"
    },
    info: {
      title: "Informations de contact",
      email: "contact@smarthebooth.com",
      phone: "+32 486 62 70 99",
      address: "Rue saint michel 5, 1000 Bruxelles",
      hours: "Lun-Ven: 9h-18h"
    }
  },
  en: {
    title: "Contact Us",
    subtitle: "Our team is here to help",
    form: {
      name: "Your name",
      email: "Your email",
      subject: "Subject",
      message: "Your message",
      submit: "Send message"
    },
    info: {
      title: "Contact Information",
      email: "contact@smarthebooth.com",
      phone: "+32 486 62 70 99",
      address: "Rue saint michel 5, 1000 Brussels",
      hours: "Mon-Fri: 9am-6pm"
    }
  }
}

export default function ContactPage() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ajoutez ici la logique d'envoi du formulaire
  }

  return (
    <div className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input placeholder={t.form.name} required />
            <Input type="email" placeholder={t.form.email} required />
            <Input placeholder={t.form.subject} required />
            <Textarea 
              placeholder={t.form.message} 
              className="min-h-[150px]" 
              required 
            />
            <Button type="submit" className="w-full bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300">
              {t.form.submit}
            </Button>
          </form>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{t.info.title}</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">{t.info.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">{t.info.phone}</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">{t.info.address}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">{t.info.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 