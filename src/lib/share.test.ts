import { describe, expect, it } from 'vitest'
import { decodeState, encodeState } from './share'

describe('share', () => {
  it('round-trips state through the URL hash', () => {
    const s = { base: '#ff8800', fg: '#111111', bg: '#fafafa' }
    const hash = encodeState(s)
    expect(hash).toBe('#c=ff8800&fg=111111&bg=fafafa')
    expect(decodeState(hash)).toEqual(s)
  })

  it('ignores missing or malformed values', () => {
    expect(decodeState('')).toEqual({})
    expect(decodeState('#c=zzzzzz&fg=12&bg=FFFFFF')).toEqual({ bg: '#ffffff' })
  })
})
