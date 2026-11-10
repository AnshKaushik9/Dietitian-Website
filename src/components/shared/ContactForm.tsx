'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWeb3Forms } from '@/hooks/useWeb3Forms'
import { ErrorMessage } from '@/components/shared/ErrorMessage'

export function ContactForm({
  accessKey,
  submitButtonText,
  successMessage,
  errorMessage,
  formHeading,
  formDescription,
}: {
  accessKey: string
  submitButtonText?: string
  successMessage?: string
  errorMessage?: string
  formHeading?: string
  formDescription?: string
}) {
  const { submit, isSubmitting } = useWeb3Forms({ accessKey, successMessage, errorMessage })
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    areaOfConcern: '',
    message: ''
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string) => {
    if (name === 'fullName') {
      if (!value.trim()) return 'This field is required.'
    }
    if (name === 'email') {
      if (!value.trim()) return 'This field is required.'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) return "That doesn't look like an email address."
    }
    if (name === 'message') {
      if (!value.trim()) return 'This field is required.'
    }
    if (name === 'areaOfConcern') {
      if (!value.trim()) return 'This field is required.'
    }
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))

    // Clear error immediately if it becomes valid after being touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Validate all fields on submit
    const newErrors: Record<string, string> = {}
    let isValid = true

    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key as keyof typeof values])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)

    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as Record<string, boolean>)
    setTouched(allTouched)

    if (!isValid) return

    const form = event.currentTarget
    const formData = new FormData(form)

    await submit(formData, () => {
      setValues({
        fullName: '',
        email: '',
        whatsapp: '',
        areaOfConcern: '',
        message: ''
      })
      setTouched({})
      setErrors({})
      form.reset()
    })
  }

  return (
    <div className="bg-background p-8 rounded-2xl border-none space-y-6">
      {(formHeading || formDescription) && (
        <div className="mb-8">
          {formHeading && <h3 className="text-2xl font-bold font-heading">{formHeading}</h3>}
          {formDescription && <p className="text-muted-foreground mt-2">{formDescription}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={cn(
                "w-full px-4 py-2 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                errors.fullName && "border-destructive/50 focus:ring-destructive/50 bg-destructive/5"
              )}
              placeholder="Enter Your Name"
            />
            <ErrorMessage error={errors.fullName} id="fullName-error" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                "w-full px-4 py-2 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                errors.email && "border-destructive/50 focus:ring-destructive/50 bg-destructive/5"
              )}
              placeholder="xyz@example.com"
            />
            <ErrorMessage error={errors.email} id="email-error" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number (Optional)</label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={values.whatsapp}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="+1 (123) 456-7890"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="areaOfConcern" className="text-sm font-medium">Area of Concern</label>
          <select
            id="areaOfConcern"
            name="areaOfConcern"
            value={values.areaOfConcern}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-invalid={!!errors.areaOfConcern}
            aria-describedby={errors.areaOfConcern ? "areaOfConcern-error" : undefined}
            className={cn(
              "w-full px-4 py-2 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
              errors.areaOfConcern && "border-destructive/50 focus:ring-destructive/50 bg-destructive/5",
              !values.areaOfConcern && "text-muted-foreground"
            )}
          >
            <option value="" disabled>Select an area of concern</option>
            <option value="Gut Health">Gut Health & Digestion</option>
            <option value="Hormonal Balance">Hormonal Balance (PCOS, Thyroid)</option>
            <option value="Autoimmune">Autoimmune Conditions</option>
            <option value="Weight Management">Weight Management</option>
            <option value="Other">Other</option>
          </select>
          <ErrorMessage error={errors.areaOfConcern} id="areaOfConcern-error" />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">How can we assist you today?</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "w-full px-4 py-2 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-colors",
              errors.message && "border-destructive/50 focus:ring-destructive/50 bg-destructive/5"
            )}
            placeholder="Please describe your current situation or goals..."
          />
          <ErrorMessage error={errors.message} id="message-error" />
        </div>

        <input type="hidden" name="subject" value="New Consultation Request from Dietitian Website" />
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <Button type="submit" className="w-full text-lg py-6" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            submitButtonText || 'Send Message'
          )}
        </Button>
      </form>
    </div>
  )
}
