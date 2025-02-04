import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('has type="button" by default', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })
  })

  describe('variants', () => {
    it('renders primary variant by default', () => {
      render(<Button>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-600')
      expect(button).toHaveClass('text-white')
    })

    it('renders primary variant explicitly', () => {
      render(<Button variant="primary">Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-600')
      expect(button).toHaveClass('text-white')
    })

    it('renders secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-white')
      expect(button).toHaveClass('text-gray-700')
      expect(button).toHaveClass('border-gray-300')
    })
  })

  describe('fullWidth prop', () => {
    it('does not have full width by default', () => {
      render(<Button>Normal width</Button>)
      expect(screen.getByRole('button')).not.toHaveClass('w-full')
    })

    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full width</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
    })
  })

  describe('className prop', () => {
    it('applies additional className', () => {
      render(<Button className="test-class">With class</Button>)
      expect(screen.getByRole('button')).toHaveClass('test-class')
    })

    it('preserves default classes when adding custom className', () => {
      render(<Button className="test-class">With class</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('test-class')
      expect(button).toHaveClass('px-4')
      expect(button).toHaveClass('py-2')
    })
  })

  describe('button attributes', () => {
    it('applies disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('applies aria-label', () => {
      render(<Button aria-label="Test label">Button</Button>)
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Test label',
      )
    })
  })

  describe('interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      )

      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('is keyboard accessible', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()

      await userEvent.keyboard('[Enter]')
      expect(handleClick).toHaveBeenCalledTimes(1)

      await userEvent.keyboard('[Space]')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('focus state', () => {
    it('has focus ring styles', () => {
      render(<Button>Focus me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus:ring-2')
      expect(button).toHaveClass('focus:ring-offset-2')
      expect(button).toHaveClass('focus:ring-blue-500')
    })
  })
})
