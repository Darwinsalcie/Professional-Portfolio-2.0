import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'
import { getContent } from '@/content'

describe('ContactForm', () => {
  const content = getContent('en')
  const labels = content.contact.formLabels

  it('renders form inputs, labels, and submit button', () => {
    render(<ContactForm formLabels={labels} />)

    expect(screen.getByLabelText(labels.name)).toBeInTheDocument()
    expect(screen.getByLabelText(labels.email)).toBeInTheDocument()
    expect(screen.getByLabelText(labels.message)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: labels.submit })).toBeInTheDocument()
  })

  it('validates required fields and displays error states on empty submit', async () => {
    const user = userEvent.setup()
    render(<ContactForm formLabels={labels} />)

    const submitBtn = screen.getByRole('button', { name: labels.submit })
    await user.click(submitBtn)

    await waitFor(() => {
      const nameInput = screen.getByLabelText(labels.name)
      expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('submits successfully and presents live region success notification', async () => {
    const user = userEvent.setup()
    const onSubmitOverride = vi.fn().mockResolvedValue({
      ok: true,
      status: 'success',
    })

    render(<ContactForm formLabels={labels} onSubmitOverride={onSubmitOverride} />)

    await user.type(screen.getByLabelText(labels.name), 'Alice Walker')
    await user.type(screen.getByLabelText(labels.email), 'alice@example.com')
    await user.type(
      screen.getByLabelText(labels.message),
      'We are looking to develop an enterprise .NET core web service with React.',
    )

    const submitBtn = screen.getByRole('button', { name: labels.submit })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(onSubmitOverride).toHaveBeenCalledTimes(1)
      expect(screen.getByText(labels.successMessage)).toBeInTheDocument()
    })
  })

  it('displays error message notification when submission fails', async () => {
    const user = userEvent.setup()
    const onSubmitOverride = vi.fn().mockResolvedValue({
      ok: false,
      status: 'error',
    })

    render(<ContactForm formLabels={labels} onSubmitOverride={onSubmitOverride} />)

    await user.type(screen.getByLabelText(labels.name), 'Bob Miller')
    await user.type(screen.getByLabelText(labels.email), 'bob@example.com')
    await user.type(
      screen.getByLabelText(labels.message),
      'A request for quotation regarding cloud architecture on Microsoft Azure.',
    )

    const submitBtn = screen.getByRole('button', { name: labels.submit })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(onSubmitOverride).toHaveBeenCalledTimes(1)
      expect(screen.getByText(labels.errorMessage)).toBeInTheDocument()
    })
  })
})
