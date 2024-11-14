'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle, AlertCircle, Upload, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { ContactTranslations } from '@/types/translations'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
  attachment?: File | null
}

type FormErrors = {
  [K in keyof FormData]?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

export function ContactPage({ translations: t }: { translations: ContactTranslations }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateField = (name: keyof FormData, value: string | File | null) => {
    switch (name) {
      case 'name':
        return !value || (typeof value === 'string' && value.trim() === '') ? t.form.required : ''
      case 'email':
        return !value || typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? t.form.invalidEmail : ''
      case 'subject':
        return !value || (typeof value === 'string' && value.trim() === '') ? t.form.required : ''
      case 'message':
        return !value || (typeof value === 'string' && value.trim() === '') ? t.form.required : ''
      case 'attachment':
        if (!value || !(value instanceof File)) return ''
        if (value.size > MAX_FILE_SIZE) return t.form.attachmentTooLarge
        if (!ALLOWED_FILE_TYPES.includes(value.type)) return t.form.invalidFileType
        return ''
      default:
        return ''
    }
  }

  const handleChange = (name: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched.has(name)) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => new Set(prev).add(name))
    const value = formData[name]
    setErrors(prev => ({ 
      ...prev, 
      [name]: validateField(name, value ?? null)
    }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    handleChange('attachment', file)
  }

  const removeFile = () => {
    handleChange('attachment', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitFormData = new FormData()
    submitFormData.append('name', formData.name)
    submitFormData.append('email', formData.email)
    submitFormData.append('subject', formData.subject)
    submitFormData.append('message', formData.message)
    
    if (formData.attachment) {
      submitFormData.append('file', formData.attachment)
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: submitFormData
      })

      if (!response.ok) throw new Error('Failed to send message')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '', attachment: null })
      setTouched(new Set())
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 bg-background">
      {/* En-tête de la page */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-foreground text-3xl font-bold tracking-tighter mb-4"
        >
          {t.contact.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          {t.contact.subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-[#1a0f2e]/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champs du formulaire */}
            {Object.entries(formData).map(([key, value]) => {
              if (key === 'attachment') return null
              const fieldKey = key as keyof FormData
              const hasError = errors[fieldKey] && touched.has(fieldKey)
              
              return (
                <div key={key} className="space-y-2">
                  <motion.div
                    initial={false}
                    animate={{
                      y: hasError ? [-2, 0] : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {key === 'message' ? (
                      <Textarea
                        value={value as string}
                        onChange={(e) => handleChange(fieldKey, e.target.value)}
                        onBlur={() => handleBlur(fieldKey)}
                        placeholder={t.form[fieldKey]}
                        className={`
                          transition-all duration-300 bg-background
                          ${hasError ? 'border-destructive' : 'focus:border-primary'}
                          ${touched.has(fieldKey) && !errors[fieldKey] ? 'border-primary/50' : ''}
                        `}
                      />
                    ) : (
                      <Input
                        type={key === 'email' ? 'email' : 'text'}
                        value={value as string}
                        onChange={(e) => handleChange(fieldKey, e.target.value)}
                        onBlur={() => handleBlur(fieldKey)}
                        placeholder={t.form[fieldKey]}
                        className={`
                          transition-all duration-300 bg-background
                          ${hasError ? 'border-destructive' : 'focus:border-primary'}
                          ${touched.has(fieldKey) && !errors[fieldKey] ? 'border-primary/50' : ''}
                        `}
                      />
                    )}
                  </motion.div>

                  <AnimatePresence>
                    {hasError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors[fieldKey]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* Zone de pièce jointe */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept={ALLOWED_FILE_TYPES.join(',')}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                >
                  {formData.attachment ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {formData.attachment.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          removeFile()
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t.form.dropzone}
                      </span>
                    </div>
                  )}
                </label>
              </div>

              <AnimatePresence>
                {errors.attachment && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.attachment}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Bouton de soumission */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  t.form.submit
                )}
              </Button>
            </motion.div>

            {/* Message de statut */}
            <AnimatePresence>
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`
                    flex items-center gap-2 p-4 rounded-lg
                    ${submitStatus === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' : ''}
                    ${submitStatus === 'error' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' : ''}
                  `}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>
                    {submitStatus === 'success' ? t.form.success : t.form.error}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Informations de contact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-[#1a0f2e]/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              {t.info.title}
            </h2>
            <div className="space-y-6">
              <motion.a
                href={`mailto:${t.info.email}`}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5" />
                <span>{t.info.email}</span>
              </motion.a>
              <motion.a
                href={`tel:${t.info.phone}`}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5" />
                <span>{t.info.phone}</span>
              </motion.a>
              <motion.div
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5" />
                <span>{t.info.address}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30"
                whileHover={{ x: 5 }}
              >
                <Clock className="w-5 h-5" />
                <span>{t.info.hours}</span>
              </motion.div>
            </div>
          </div>

          {/* Carte Google Maps sécurisée */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            {/* Placeholder pendant le chargement */}
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
            
            {/* Carte avec URL sécurisée */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.698168171767!2d4.3517!3d50.8503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c38150702ee9%3A0xb283ebb7da71b23e!2sRue%20Saint-Michel%205%2C%201000%20Bruxelles!5e0!3m2!1sfr!2sbe!4v1731161910725!5m2!1sfr!2sbe"
              className="absolute inset-0 w-full h-full border-0 z-10"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
              aria-label="Carte de localisation"
              allowFullScreen
            />
            
            {/* Overlay pour améliorer la visibilité */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10" />
          </div>
        </motion.div>
      </div>
    </div>
  )
} 