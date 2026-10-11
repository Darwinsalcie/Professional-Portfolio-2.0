import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StackSection } from './StackSection'
import { StackGroupCard } from './StackGroupCard'
import { getContent } from '@/content'

describe('StackSection', () => {
  const content = getContent('en')

  it('renders section header with eyebrow, title, and lede', () => {
    render(<StackSection stack={content.stack} ui={content.ui} />)

    expect(screen.getByText(content.ui.stackEyebrow)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: content.ui.stackTitle }),
    ).toBeInTheDocument()
    expect(screen.getByText(content.ui.stackLede)).toBeInTheDocument()
  })

  it('renders all groups and technology chips', () => {
    render(<StackSection stack={content.stack} ui={content.ui} />)

    content.stack.forEach((group) => {
      expect(screen.getByRole('heading', { level: 3, name: group.title })).toBeInTheDocument()
      group.items.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })
  })
})

describe('StackGroupCard', () => {
  const group = getContent('en').stack[0]
  if (!group) {
    throw new Error('Expected at least one stack group in test content')
  }

  it('renders group title and chips with appropriate styling', () => {
    render(<StackGroupCard group={group} />)

    expect(screen.getByRole('heading', { level: 3, name: group.title })).toBeInTheDocument()
    group.items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument()
    })
  })
})
