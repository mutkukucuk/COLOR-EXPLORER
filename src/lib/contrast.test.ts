import { describe, expect, it } from 'vitest'
import { ratio, readableText, wcag } from './contrast'

describe('contrast', () => {
  it('computes known WCAG ratios', () => {
    expect(ratio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(ratio('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
    expect(ratio('#777777', '#ffffff')).toBeCloseTo(4.48, 2)
  })

  it('applies AA/AAA thresholds', () => {
    expect(wcag(4.48)).toEqual({ AA: false, AAA: false, AALarge: true, AAALarge: false })
    expect(wcag(4.5)).toEqual({ AA: true, AAA: false, AALarge: true, AAALarge: true })
    expect(wcag(7)).toEqual({ AA: true, AAA: true, AALarge: true, AAALarge: true })
    expect(wcag(2.9).AALarge).toBe(false)
  })

  it('picks readable text color', () => {
    expect(readableText('#ffffff')).toBe('#000000')
    expect(readableText('#111111')).toBe('#ffffff')
    expect(readableText('#ffeb3b')).toBe('#000000')
  })
})
