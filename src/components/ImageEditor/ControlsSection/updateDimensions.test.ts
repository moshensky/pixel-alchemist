import { describe, expect, it } from 'vitest'
import type { Dimensions } from '../types'
import { updateDimensions } from './updateDimensions'

describe('updateDimensions', () => {
  const currentDimensions: Dimensions = {
    width: 800,
    height: 600,
  }

  const maxDimensions: Dimensions = {
    width: 1000,
    height: 800,
  }

  const minDimensions: Dimensions = {
    width: 1,
    height: 1,
  }

  describe('unlocked aspect ratio', () => {
    it('updates width while keeping height unchanged', () => {
      expect(
        updateDimensions(
          currentDimensions,
          maxDimensions,
          minDimensions,
          900,
          'width',
          false,
        ),
      ).toEqual({
        width: 900,
        height: 600,
      })
    })

    it('updates height while keeping width unchanged', () => {
      expect(
        updateDimensions(
          currentDimensions,
          maxDimensions,
          minDimensions,
          700,
          'height',
          false,
        ),
      ).toEqual({
        width: 800,
        height: 700,
      })
    })

    describe('respects boundaries', () => {
      it('clamps width to maximum', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            1200,
            'width',
            false,
          ),
        ).toEqual({
          width: 1000, // maxWidth
          height: 600,
        })
      })

      it('clamps width to minimum', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            0,
            'width',
            false,
          ),
        ).toEqual({
          width: 1, // minWidth
          height: 600,
        })
      })

      it('clamps height to maximum', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            900,
            'height',
            false,
          ),
        ).toEqual({
          width: 800,
          height: 800, // maxHeight
        })
      })

      it('clamps height to minimum', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            0,
            'height',
            false,
          ),
        ).toEqual({
          width: 800,
          height: 1, // minHeight
        })
      })
    })
  })

  describe('locked aspect ratio', () => {
    describe('updating width', () => {
      it('maintains aspect ratio when increasing width', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            900,
            'width',
            true,
          ),
        ).toEqual({
          width: 900,
          height: 675,
        })
      })

      it('maintains aspect ratio when decreasing width', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            200,
            'width',
            true,
          ),
        ).toEqual({
          width: 200,
          height: 150,
        })
      })

      it('respects max height constraint', () => {
        // Try to set width that would make height exceed maxHeight
        expect(
          updateDimensions(
            currentDimensions,
            { ...maxDimensions, height: 700 },
            minDimensions,
            1200,
            'width',
            true,
          ),
        ).toEqual({
          // width adjusted down to maintain aspect ratio with maxHeight
          width: 933,
          // maxHeight
          height: 700,
        })
      })

      it('respects min height constraint', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            1,
            'width',
            true,
          ),
        ).toEqual({
          width: 1,
          height: 1,
        })
      })
    })

    describe('updating height', () => {
      it('maintains aspect ratio when increasing height', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            700,
            'height',
            true,
          ),
        ).toEqual({
          width: 933,
          height: 700,
        })
      })

      it('maintains aspect ratio when decreasing height', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            150,
            'height',
            true,
          ),
        ).toEqual({
          width: 200,
          height: 150,
        })
      })

      it('respects max width constraint', () => {
        expect(
          updateDimensions(
            currentDimensions,
            { ...maxDimensions, width: 900 },
            minDimensions,
            900,
            'height',
            true,
          ),
        ).toEqual({
          width: 900, // maxWidth
          height: 675, // height adjusted to maintain aspect ratio
        })
      })

      it('respects min width constraint', () => {
        expect(
          updateDimensions(
            currentDimensions,
            maxDimensions,
            minDimensions,
            1,
            'height',
            true,
          ),
        ).toEqual({
          width: 1,
          height: 1,
        })
      })
    })
  })
})
