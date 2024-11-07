'use client'

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Paperclip } from "lucide-react"
import { FadeIn } from '@/components/ui/motion'

type ContactPageProps = {
  translations: any
}

export function ContactPage({ translations: t }: ContactPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setMessage(t.form.attachmentTooLarge)
      e.target.value = ''
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setMessage(t.form.invalidFileType)
      e.target.value = ''
      return
    }

    setAttachment(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const formData = new FormData(e.currentTarget)
    if (attachment) {
      formData.append('attachment', attachment)
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi')
      }

      setMessage(t.form.success)
      formRef.current?.reset()
      setAttachment(null)
      
      // Réinitialiser le champ de fichier
      const fileInput = formRef.current?.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
    } catch (error) {
      console.error('Erreur:', error)
      setMessage(t.form.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{t.contact.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.contact.subtitle}</p>
          </FadeIn>
        </div>

        {message && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-6 bg-white dark:bg-[#2d1f42] p-6 md:p-8 rounded-xl shadow-lg">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <Input
                name="name"
                type="text"
                placeholder={t.form.name}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder={t.form.email}
                required
              />
              <Input
                name="subject"
                type="text"
                placeholder={t.form.subject}
                required
              />
              <Textarea
                name="message"
                placeholder={t.form.message}
                className="min-h-[150px]"
                required
              />
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