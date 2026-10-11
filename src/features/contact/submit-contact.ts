import { getEnv } from '@/lib/env'
import type { ContactFormData } from './contact-schema'

export type SubmitStatus = 'success' | 'invalid' | 'not-configured' | 'error'

export interface SubmitResult {
  readonly ok: boolean
  readonly status: SubmitStatus
  readonly message?: string
}

/**
 * Submits contact form payload.
 * Formspree-compatible: POSTs JSON with Accept: application/json.
 * If VITE_CONTACT_ENDPOINT is not configured:
 * - In development mode: resolves after short mock delay (for DX testing).
 * - In production mode: returns explicit 'not-configured' error (never silently fakes success in prod).
 * Honeypot: if company field is populated, silently rejects as spam.
 */
export async function submitContact(
  payload: ContactFormData,
  envOverride?: ReturnType<typeof getEnv>,
): Promise<SubmitResult> {
  // Guard honeypot
  if (payload.company && payload.company.trim().length > 0) {
    return {
      ok: false,
      status: 'invalid',
      message: 'Spam detected',
    }
  }

  const env = envOverride ?? getEnv()

  // TODO(content): configure VITE_CONTACT_ENDPOINT with Formspree, Basin or custom API
  if (!env.contactEndpoint) {
    if (env.isProd) {
      return {
        ok: false,
        status: 'not-configured',
        message: 'Contact endpoint is not configured in production.',
      }
    }

    // Dev mock delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      ok: true,
      status: 'success',
      message: 'Mock submission succeeded in development mode.',
    }
  }

  try {
    const response = await fetch(env.contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
    })

    if (!response.ok) {
      return {
        ok: false,
        status: 'error',
        message: `Submission failed with status: ${String(response.status)}`,
      }
    }

    return {
      ok: true,
      status: 'success',
    }
  } catch (error) {
    return {
      ok: false,
      status: 'error',
      message: error instanceof Error ? error.message : 'Network error',
    }
  }
}
