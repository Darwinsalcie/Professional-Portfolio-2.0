import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema, type ContactFormData } from './contact-schema'
import { submitContact, type SubmitResult } from './submit-contact'
import type { ContactContent } from '@/types/content'

export interface ContactFormProps {
  formLabels: ContactContent['formLabels']
  onSubmitSuccess?: () => void
  onSubmitOverride?: (data: ContactFormData) => Promise<SubmitResult>
}

/**
 * Validated contact form using React Hook Form and Zod.
 * Features:
 * - Hidden off-screen honeypot field
 * - Accessible error states with aria-invalid & aria-describedby
 * - Focus first invalid input on submit
 * - Live-region status announcements for success and error
 * - Double-submission prevention and disabled states while submitting
 */
export function ContactForm({ formLabels, onSubmitSuccess, onSubmitOverride }: ContactFormProps) {
  const [submissionStatus, setSubmissionStatus] = React.useState<'idle' | 'success' | 'error'>(
    'idle',
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      company: '',
    },
    shouldFocusError: true,
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('idle')
    const result = onSubmitOverride ? await onSubmitOverride(data) : await submitContact(data)

    if (result.ok) {
      setSubmissionStatus('success')
      reset()
      onSubmitSuccess?.()
    } else {
      setSubmissionStatus('error')
    }
  }

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e)
      }}
      noValidate
      className="flex w-full flex-col gap-5"
    >
      {/* Off-screen Honeypot */}
      <div className="absolute top-auto -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company-field">Company</label>
        <input
          id="company-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
        />
      </div>

      {/* Name Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name">{formLabels.name}</Label>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={formLabels.name}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          disabled={isSubmitting}
          {...register('name')}
        />
        {errors.name && (
          <span id="contact-name-error" className="font-body text-body-sm text-danger">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email">{formLabels.email}</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="developer@domain.com"
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          disabled={isSubmitting}
          {...register('email')}
        />
        {errors.email && (
          <span id="contact-email-error" className="font-body text-body-sm text-danger">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">{formLabels.message}</Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder={formLabels.message}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          disabled={isSubmitting}
          {...register('message')}
        />
        {errors.message && (
          <span id="contact-message-error" className="font-body text-body-sm text-danger">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Status Announcements */}
      <div aria-live="polite" role="status" className="min-h-[1.5rem]">
        {submissionStatus === 'success' && (
          <div className="rounded-control border-success/30 bg-success/10 font-body text-body-sm text-success border px-4 py-3">
            {formLabels.successMessage}
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="rounded-control border-danger/30 bg-danger/10 font-body text-body-sm text-danger border px-4 py-3">
            {formLabels.errorMessage}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full self-start sm:w-auto"
      >
        {isSubmitting ? formLabels.submitting : formLabels.submit}
      </Button>
    </form>
  )
}
