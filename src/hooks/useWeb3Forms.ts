import { useState } from 'react'
import { toast } from 'sonner'

interface UseWeb3FormsProps {
  accessKey: string
  successMessage?: string
  errorMessage?: string
}

export function useWeb3Forms({
  accessKey,
  successMessage = 'Message sent successfully! We will get back to you soon.',
  errorMessage = 'Something went wrong. Please try again.',
}: UseWeb3FormsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (formData: FormData, onSuccess?: () => void) => {
    setIsSubmitting(true)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        toast.success(successMessage)
        onSuccess?.()
      } else {
        toast.error(data.message || errorMessage)
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submit, isSubmitting }
}
