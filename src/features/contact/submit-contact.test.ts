import { describe, it, expect, vi, beforeEach } from 'vitest'
import { contactSchema } from './contact-schema'
import { submitContact } from './submit-contact'

describe('contactSchema', () => {
  it('accepts valid contact payload', () => {
    const validData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello, I would like to build a Next.js / .NET application with you.',
      company: '',
    }

    const result = contactSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short name, invalid email, or short message', () => {
    const invalidData = {
      name: 'A',
      email: 'not-an-email',
      message: 'Too short',
    }

    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      const issuePaths = result.error.issues.map((issue) => issue.path[0])
      expect(issuePaths).toContain('name')
      expect(issuePaths).toContain('email')
      expect(issuePaths).toContain('message')
    }
  })

  it('fails if honeypot company field is filled', () => {
    const honeypotData = {
      name: 'Bot User',
      email: 'bot@example.com',
      message: 'This is a long enough message to pass standard validation.',
      company: 'Bot Inc',
    }

    const result = contactSchema.safeParse(honeypotData)
    expect(result.success).toBe(false)
  })
})

describe('submitContact', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('blocks honeypot submission before network call', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const result = await submitContact({
      name: 'Spammer',
      email: 'spammer@example.com',
      message: 'A message that passes length requirements comfortably.',
      company: 'Spam Bot',
    })

    expect(result.ok).toBe(false)
    expect(result.status).toBe('invalid')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('resolves in dev mode when endpoint is not configured', async () => {
    const result = await submitContact(
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'A valid project inquiry message with sufficient character count.',
        company: '',
      },
      {
        contactEndpoint: undefined,
        siteUrl: undefined,
        isDev: true,
        isProd: false,
      },
    )

    expect(result.ok).toBe(true)
    expect(result.status).toBe('success')
  })

  it('returns not-configured error in prod when endpoint is missing', async () => {
    const result = await submitContact(
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'A valid project inquiry message with sufficient character count.',
        company: '',
      },
      {
        contactEndpoint: undefined,
        siteUrl: undefined,
        isDev: false,
        isProd: true,
      },
    )

    expect(result.ok).toBe(false)
    expect(result.status).toBe('not-configured')
  })

  it('sends POST request to configured endpoint and returns success on 200', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
    } as Response)

    const result = await submitContact(
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'A valid project inquiry message with sufficient character count.',
        company: '',
      },
      {
        contactEndpoint: 'https://formspree.io/f/xyz',
        siteUrl: 'https://example.com',
        isDev: false,
        isProd: true,
      },
    )

    expect(fetchMock).toHaveBeenCalledWith('https://formspree.io/f/xyz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'A valid project inquiry message with sufficient character count.',
      }),
    })
    expect(result.ok).toBe(true)
    expect(result.status).toBe('success')
  })

  it('handles network or endpoint HTTP failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    const result = await submitContact(
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'A valid project inquiry message with sufficient character count.',
        company: '',
      },
      {
        contactEndpoint: 'https://formspree.io/f/xyz',
        siteUrl: 'https://example.com',
        isDev: false,
        isProd: true,
      },
    )

    expect(result.ok).toBe(false)
    expect(result.status).toBe('error')
  })
})
