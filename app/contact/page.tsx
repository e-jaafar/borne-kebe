'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Paperclip } from "lucide-react"
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
      submit: "Envoyer le message",
      success: "Message envoyé avec succès !",
      error: "Une erreur est survenue. Veuillez réessayer.",
      required: "Ce champ est requis",
      invalidEmail: "Email invalide",
      attachment: "Pièce jointe (max 5MB)",
      attachmentTooLarge: "Le fichier est trop volumineux (max 5MB)",
      invalidFileType: "Type de fichier non supporté",
    },
    info: {
      title: "Informations de contact",
      email: "alchimistelab@hotmail.com",
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
      submit: "Send message",
      success: "Message sent successfully!",
      error: "An error occurred. Please try again.",
      required: "This field is required",
      invalidEmail: "Invalid email",
      attachment: "Attachment (max 5MB)",
      attachmentTooLarge: "File is too large (max 5MB)",
      invalidFileType: "Unsupported file type",
    },
    info: {
      title: "Contact Information",
      email: "alchimistelab@hotmail.com",
      phone: "+32 486 62 70 99",
      address: "Rue saint michel 5, 1000 Brussels",
      hours: "Mon-Fri: 9am-6pm"
    }
  }
}

export default function ContactPage() {
  const { lang } = useLang()
  const t = translations[lang as keyof typeof translations]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const formRef = useRef<HTMLFormElement>(null)
  const [attachment, setAttachment] = useState<File | null>(null)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const validateForm = (formData: FormData) => {
    const newErrors: {[key: string]: string} = {}
    
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name) newErrors.name = t.form.required
    if (!email) newErrors.email = t.form.required
    if (!email.includes('@')) newErrors.email = t.form.invalidEmail
    if (!subject) newErrors.subject = t.form.required
    if (!message) newErrors.message = t.form.required

    return newErrors
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: t.form.attachmentTooLarge }))
      e.target.value = ''
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, file: t.form.invalidFileType }))
      e.target.value = ''
      return
    }

    setAttachment(file)
    setErrors(prev => ({ ...prev, file: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setMessage('')
    
    const formData = new FormData(e.currentTarget)
    const newErrors = validateForm(formData)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    const submitFormData = new FormData()
    submitFormData.append('name', formData.get('name') as string)
    submitFormData.append('email', formData.get('email') as string)
    submitFormData.append('subject', formData.get('subject') as string)
    submitFormData.append('message', formData.get('message') as string)
    if (attachment) {
      submitFormData.append('attachment', attachment)
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: submitFormData,
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }

      setMessage(t.form.success)
      formRef.current?.reset()
      setAttachment(null)
    } catch (err) {
      console.error('Erreur:', err)
      setMessage(t.form.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {message && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Formulaire - occupe 3 colonnes */}
          <div className="lg:col-span-3 space-y-6 bg-white dark:bg-[#2d1f42] p-6 md:p-8 rounded-xl shadow-lg">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  name="name"
                  type="text"
                  placeholder={t.form.name}
                  className={errors.name ? "border-red-500" : ""}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  placeholder={t.form.email}
                  className={errors.email ? "border-red-500" : ""}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  name="subject"
                  type="text"
                  placeholder={t.form.subject}
                  className={errors.subject ? "border-red-500" : ""}
                  required
                />
                {errors.subject && (
                  <p className="text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder={t.form.message}
                  className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                  required
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    name="attachment"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    {t.form.attachment}
                  </Button>
                  {attachment && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {attachment.name}
                    </span>
                  )}
                </div>
                {errors.file && (
                  <p className="text-sm text-red-500">{errors.file}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t.form.submit}
                  </div>
                ) : (
                  t.form.submit
                )}
              </Button>
            </form>
          </div>

          {/* Informations de contact - occupe 2 colonnes */}
          <div className="lg:col-span-2 space-y-8 bg-white dark:bg-[#2d1f42] p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {t.info.title}
            </h2>
            <div className="space-y-6">
              <a 
                href={`mailto:${t.info.email}`}
                className="flex items-center space-x-4 hover:text-primary transition-colors group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.info.email}</span>
              </a>
              <a 
                href={`tel:${t.info.phone}`}
                className="flex items-center space-x-4 hover:text-primary transition-colors group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.info.phone}</span>
              </a>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.info.address}</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.info.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 