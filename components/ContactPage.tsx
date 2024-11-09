'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { ContactTranslations } from '@/types/translations'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = {
  [K in keyof FormData]?: string
}

export function ContactPage({ translations: t }: { translations: ContactTranslations }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set())

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? t.form.required : ''
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? t.form.invalidEmail : ''
      case 'subject':
        return value.length < 3 ? t.form.required : ''
      case 'message':
        return value.length < 10 ? t.form.required : ''
      default:
        return ''
    }
  }

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched.has(name)) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => new Set(prev).add(name))
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name]) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Valider tous les champs
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof FormData, value)
      if (error) newErrors[key as keyof FormData] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to send message')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTouched(new Set())
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champs du formulaire */}
            {Object.entries(formData).map(([key, value]) => {
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
                        value={value}
                        onChange={(e) => handleChange(fieldKey, e.target.value)}
                        onBlur={() => handleBlur(fieldKey)}
                        placeholder={t.form[fieldKey]}
                        className={`
                          transition-all duration-300
                          ${hasError ? 'border-red-500 dark:border-red-400' : 'focus:border-purple-500 dark:focus:border-purple-400'}
                          ${touched.has(fieldKey) && !errors[fieldKey] ? 'border-green-500 dark:border-green-400' : ''}
                        `}
                      />
                    ) : (
                      <Input
                        type={key === 'email' ? 'email' : 'text'}
                        value={value}
                        onChange={(e) => handleChange(fieldKey, e.target.value)}
                        onBlur={() => handleBlur(fieldKey)}
                        placeholder={t.form[fieldKey]}
                        className={`
                          transition-all duration-300
                          ${hasError ? 'border-red-500 dark:border-red-400' : 'focus:border-purple-500 dark:focus:border-purple-400'}
                          ${touched.has(fieldKey) && !errors[fieldKey] ? 'border-green-500 dark:border-green-400' : ''}
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

            {/* Bouton de soumission */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
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
          <div>
            <h2 className="text-2xl font-bold mb-6">{t.info.title}</h2>
            <div className="space-y-4">
              <motion.a
                href={`mailto:${t.info.email}`}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5" />
                <span>{t.info.email}</span>
              </motion.a>
              <motion.a
                href={`tel:${t.info.phone}`}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5" />
                <span>{t.info.phone}</span>
              </motion.a>
              <motion.div
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5" />
                <span>{t.info.address}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Clock className="w-5 h-5" />
                <span>{t.info.hours}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 