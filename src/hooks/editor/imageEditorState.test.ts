import { describe, expect, it } from 'vitest'
import {
  createUrlSearchParams,
  getStateFromUrlOrDefaults,
} from './imageEditorState'

describe('getStateFromUrlOrDefaults', () => {
  it('returns default values for empty params', () => {
    const params = new URLSearchParams()
    expect(getStateFromUrlOrDefaults(params)).toEqual({
      width: 800,
      height: 600,
      blur: 0,
      grayscale: false,
    })
  })

  it('parses values from URL params', () => {
    const params = new URLSearchParams(
      'width=400&height=300&blur=5&grayscale=true&returnPage=4&returnItems=12',
    )
    expect(getStateFromUrlOrDefaults(params)).toEqual({
      width: 400,
      height: 300,
      blur: 5,
      grayscale: true,
      returnTo: {
        page: 4,
        items: 12,
      },
    })
  })

  it('clamps blur value to max', () => {
    const params = new URLSearchParams('blur=15')
    expect(getStateFromUrlOrDefaults(params)).toEqual({
      width: 800,
      height: 600,
      blur: 10,
      grayscale: false,
    })
  })

  it('clamps blur value to min', () => {
    const params = new URLSearchParams('blur=-15')
    expect(getStateFromUrlOrDefaults(params)).toEqual({
      width: 800,
      height: 600,
      blur: 0,
      grayscale: false,
    })
  })
})

describe('createUrlSearchParams', () => {
  const currentState = {
    width: 800,
    height: 600,
    blur: 0,
    grayscale: false,
  }

  it('always includes width and height', () => {
    const params = createUrlSearchParams(currentState, {})
    expect(params.get('width')).toBe('800')
    expect(params.get('height')).toBe('600')
  })

  it('includes returnTo when not empty', () => {
    const params = createUrlSearchParams(
      { ...currentState, returnTo: { page: 4, items: 6 } },
      {},
    )
    expect(params.get('returnPage')).toBe('4')
    expect(params.get('returnItems')).toBe('6')
  })

  it('omits blur when 0', () => {
    const params = createUrlSearchParams(currentState, { blur: 0 })
    expect(params.has('blur')).toBe(false)
  })

  it('omits blur when undefined', () => {
    const params = createUrlSearchParams(currentState, { blur: undefined })
    expect(params.has('blur')).toBe(false)
  })

  it('includes blur when greater than 0', () => {
    const params = createUrlSearchParams(currentState, { blur: 5 })
    expect(params.get('blur')).toBe('5')
  })

  it('omits grayscale when false or undefined', () => {
    const params = createUrlSearchParams(currentState, { grayscale: false })
    expect(params.has('grayscale')).toBe(false)
  })

  it('includes grayscale when true', () => {
    const params = createUrlSearchParams(currentState, { grayscale: true })
    expect(params.get('grayscale')).toBe('true')
  })

  it('combines current state with new state', () => {
    const params = createUrlSearchParams(
      { width: 800, height: 600, blur: 5, grayscale: true },
      { width: 400 },
    )
    expect(params.get('width')).toBe('400')
    expect(params.get('height')).toBe('600')
    expect(params.get('blur')).toBe('5')
    expect(params.get('grayscale')).toBe('true')
  })
})
