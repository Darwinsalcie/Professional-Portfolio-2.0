import { z } from 'zod'

/**
 * Client-side contact form validation schema.
 * - name: 2 to 80 characters
 * - email: valid email address
 * - message: 20 to 2000 characters
 * - company: honeypot field, must be empty string
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80, { message: 'Name must not exceed 80 characters' }),
  email: z
    .string()
    .trim()
    .check(z.email({ message: 'Please enter a valid email address' })),
  message: z
    .string()
    .trim()
    .min(20, { message: 'Message must be at least 20 characters' })
    .max(2000, { message: 'Message must not exceed 2000 characters' }),
  company: z.string().max(0, { message: 'Spam detected' }).optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactSchema>
