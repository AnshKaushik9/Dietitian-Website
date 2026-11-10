'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWeb3Forms } from '@/hooks/useWeb3Forms'
import { ErrorMessage } from '@/components/shared/ErrorMessage'

export function SupportForm({
  accessKey,
  submitButtonText,
  successMessage,
  errorMessage,
}: {
  accessKey: string
  submitButtonText?: string
  successMessage?: string
  errorMessage?: string
}) {
  const { submit, isSubmitting } = useWeb3Forms({ accessKey, successMessage, errorMessage })
  const [values, setValues] = useState({
    name: '',
    email: '',
    issue: ''
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string) => {
    if (name === 'name') {
      if (!value.trim()) return 'This field is required.'
    }
    if (name === 'email') {
      if (!value.trim()) return 'This field is required.'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) return "That doesn't look like an email address."
    }
    if (name === 'issue') {
      if (!value.trim()) return 'This field is required.'
    }
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

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
        name: '',
        email: '',
        issue: ''
      })
      setTouched({})
      setErrors({})
      form.reset()
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              errors.name && "border-destructive/50 focus:ring-destructive/50 bg-destructive/5"
            )}
            placeholder="Your Name"
          />
          <ErrorMessage error={errors.name} id="name-error" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              errors.email && "border-destructive/50 focus:ring-destructive/50 bg-destructive/5"
            )}
            placeholder="xyz@example.com"
          />
          <ErrorMessage error={errors.email} id="email-error" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="issue" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Issue Description</label>
        <textarea
          id="issue"
          name="issue"
          value={values.issue}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-invalid={!!errors.issue}
          aria-describedby={errors.issue ? "issue-error" : undefined}
          className={cn(
            "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
            errors.issue && "border-destructive/50 focus:ring-destructive/50 bg-destructive/5"
          )}
          placeholder="Please describe the issue you're facing..."
        />
        <ErrorMessage error={errors.issue} id="issue-error" />
      </div>

      <input type="hidden" name="subject" value="Technical Support Request" />
      <input type="hidden" name="form_type" value="Technical Support" />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      <Button
        type="submit"
        className={cn(
          "rounded-2xl h-14 px-8 font-bold text-base md:text-lg",
          "shadow-lg shadow-primary/20",
          "transition-all duration-250 ease-out",
          "hover:-translate-y-1 hover:brightness-110 hover:shadow-xl hover:shadow-primary/40"
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          submitButtonText || 'Send'
        )}
      </Button>
    </form>
  )
}
