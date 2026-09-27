import { describe, expect, it } from 'vitest'
import { formats, parseColor } from './color'

describe('parseColor', () => {
  it('normalizes any CSS color to lowercase hex', () => {
    expect(parseColor('#FF8800')).toBe('#ff8800')
    expect(parseColor('rgb(255, 136, 0)')).toBe('#ff8800')
    expect(parseColor('hsl(32, 100%, 50%)')).toBe('#ff8800')
    expect(parseColor('rebeccapurple')).toBe('#663399')
    expect(parseColor('  #abc  ')).toBe('#aabbcc')
  })

  it('returns null for invalid input', () => {
    expect(parseColor('')).toBeNull()
    expect(parseColor('not a color')).toBeNull()
    expect(parseColor('#12345')).toBeNull()
  })
})

describe('formats', () => {
  it('formats hex as rgb/hsl/oklch', () => {
    const f = formats('#ff0000')
    expect(f.hex).toBe('#ff0000')
    expect(f.rgb).toBe('rgb(255, 0, 0)')
    expect(f.hsl).toBe('hsl(0, 100%, 50%)')
    expect(f.oklch).toMatch(/^oklch\(62\.8% 0\.25\d? 29\.\d\)$/)
  })

  it('round-trips each format back to the same hex', () => {
    for (const hex of ['#ff8800', '#3b82f6', '#123456', '#000000', '#ffffff']) {
      const f = formats(hex)
      expect(parseColor(f.rgb)).toBe(hex)
      expect(parseColor(f.oklch)).toBe(hex)
    }
  })
})
