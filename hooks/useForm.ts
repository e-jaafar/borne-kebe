'use client'

import { useState, useCallback } from 'react'

type FormState = {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
}

export function useForm(initialValues: Record<string, any>) {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {}
  })

  const setFieldValue = useCallback((field: string, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true }
    }))
  }, [])

  const validate = useCallback((values: Record<string, any>) => {
    const errors: Record<string, string> = {}
    // Ajoutez votre logique de validation ici
    return errors
  }, [])

  const handleSubmit = useCallback(async (onSubmit: (values: Record<string, any>) => Promise<void>) => {
    const errors = validate(state.values)
    setState(prev => ({ ...prev, errors }))

    if (Object.keys(errors).length === 0) {
      try {
        await onSubmit(state.values)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
  }, [state.values, validate])

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    setFieldValue,
    handleSubmit
  }
} 