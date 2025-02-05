import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Dimensions } from '../types'
import { DimensionsControl } from './DimensionsControl'

describe('DimensionsControl', () => {
  const defaultDimensions: Dimensions = {
    width: 800,
    height: 600,
  }

  const maxDimensions: Dimensions = {
    width: 1000,
    height: 800,
  }

  const setup = (props = {}) => {
    const onChange = vi.fn()
    const utils = render(
      <DimensionsControl
        dimensions={defaultDimensions}
        maxDimensions={maxDimensions}
        onChange={onChange}
        {...props}
      />,
    )

    return {
      ...utils,
      onChange,
      widthInput: screen.getByLabelText('Width'),
      heightInput: screen.getByLabelText('Height'),
      lockButton: screen.getByRole('button', { name: /aspect ratio/i }),
    }
  }

  describe('rendering', () => {
    it('displays initial dimensions', () => {
      const { widthInput, heightInput } = setup()

      expect(widthInput).toHaveValue(800)
      expect(heightInput).toHaveValue(600)
    })

    it('shows lock button with correct initial state', () => {
      const { lockButton } = setup()
      expect(lockButton).toHaveAttribute('aria-label', 'Lock aspect ratio')
    })
  })

  describe('aspect ratio lock', () => {
    it('toggles lock state when clicked', async () => {
      const { lockButton } = setup()

      expect(lockButton).toHaveAttribute('aria-label', 'Lock aspect ratio')
      await userEvent.click(lockButton)
      expect(lockButton).toHaveAttribute('aria-label', 'Unlock aspect ratio')
    })

    describe('when unlocked', () => {
      it('changes width independently', async () => {
        const { widthInput, onChange } = setup()

        await userEvent.clear(widthInput)
        await userEvent.type(widthInput, '900')
        await userEvent.tab()

        expect(onChange).toHaveBeenCalledWith({
          width: 900,
          height: 600,
        })
      })

      it('changes height independently', async () => {
        const { heightInput, onChange } = setup()

        await userEvent.clear(heightInput)
        await userEvent.type(heightInput, '700')
        await userEvent.tab()

        expect(onChange).toHaveBeenCalledWith({
          width: 800,
          height: 700,
        })
      })
    })

    describe('when locked', () => {
      it('maintains aspect ratio when changing width', async () => {
        const { widthInput, lockButton, onChange } = setup()

        await userEvent.click(lockButton)
        await userEvent.clear(widthInput)
        await userEvent.type(widthInput, '400')
        await userEvent.tab()

        expect(onChange).toHaveBeenCalledWith({
          width: 400,
          height: 300,
        })
      })

      it('maintains aspect ratio when changing height', async () => {
        const { heightInput, lockButton, onChange } = setup()

        await userEvent.click(lockButton)
        await userEvent.clear(heightInput)
        await userEvent.type(heightInput, '300')
        await userEvent.tab()

        expect(onChange).toHaveBeenCalledWith({
          width: 400,
          height: 300,
        })
      })
    })
  })

  describe('dimension constraints', () => {
    it('clamps width to maximum', async () => {
      const { widthInput, onChange } = setup()

      await userEvent.clear(widthInput)
      await userEvent.type(widthInput, '1200')
      await userEvent.tab()

      expect(onChange).toHaveBeenCalledWith({
        width: 1000,
        height: 600,
      })
    })

    it('clamps height to maximum', async () => {
      const { heightInput, onChange } = setup()

      await userEvent.clear(heightInput)
      await userEvent.type(heightInput, '900')
      await userEvent.tab()

      expect(onChange).toHaveBeenCalledWith({
        width: 800,
        height: 800,
      })
    })

    it('clamps to minimum of 1', async () => {
      const { widthInput, heightInput, onChange } = setup()

      await userEvent.clear(widthInput)
      await userEvent.type(widthInput, '0')
      await userEvent.tab()

      expect(onChange).toHaveBeenCalledWith({
        width: 1,
        height: 600,
      })

      await userEvent.clear(heightInput)
      await userEvent.type(heightInput, '0')
      await userEvent.tab()

      expect(onChange).toHaveBeenCalledWith({
        width: 800,
        height: 1,
      })
    })

    describe('when locked', () => {
      it('adjusts both dimensions when exceeding max', async () => {
        const { widthInput, lockButton, onChange } = setup()

        await userEvent.click(lockButton)
        await userEvent.clear(widthInput)
        await userEvent.type(widthInput, '1200')
        await userEvent.tab()

        // Should maintain aspect ratio while respecting max dimensions
        expect(onChange).toHaveBeenCalledWith({
          width: 1000,
          height: 750,
        })
      })
    })
  })

  describe('input validation', () => {
    it('ignores invalid input', async () => {
      const { widthInput, onChange } = setup()

      await userEvent.clear(widthInput)
      await userEvent.type(widthInput, 'abc')
      await userEvent.tab()

      expect(onChange).toBeCalledTimes(0)
    })

    it('ignores empty input', async () => {
      const { widthInput, onChange } = setup()

      await userEvent.clear(widthInput)
      await userEvent.tab()

      expect(onChange).toBeCalledTimes(0)
    })
  })
})
