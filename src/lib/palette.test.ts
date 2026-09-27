import { converter } from 'culori'
import { describe, expect, it } from 'vitest'
import { generatePalette, rotateHue } from './palette'

const hueOf = (hex: string) => converter('oklch')(hex)!.h!
const hueDiff = (a: number, b: number) => (((b - a) % 360) + 360) % 360

describe('palette', () => {
  const base = '#3b82f6'

  it('generates the expected number of colors per mode', () => {
    expect(generatePalette(base, 'complementary')).toHaveLength(2)
    expect(generatePalette(base, 'analogous')).toHaveLength(5)
    expect(generatePalette(base, 'triadic')).toHaveLength(3)
    expect(generatePalette(base, 'tints')).toHaveLength(5)
    expect(generatePalette(base, 'shades')).toHaveLength(5)
  })

  it('keeps the base color in hue-based palettes', () => {
    expect(generatePalette(base, 'complementary')[0]).toBe(base)
    expect(generatePalette(base, 'analogous')[2]).toBe(base)
    expect(generatePalette(base, 'triadic')[0]).toBe(base)
  })

  it('rotates hue by roughly the requested offset in OKLCH', () => {
    // Gamut clamping reduces chroma, not hue, so hue should stay close.
    for (const deg of [30, 120, 180, 240]) {
      expect(hueDiff(hueOf(base), hueOf(rotateHue(base, deg)))).toBeCloseTo(deg, -1)
    }
  })

  it('tints get lighter and shades get darker', () => {
    const l = (hex: string) => converter('oklch')(hex)!.l
    const tints = generatePalette(base, 'tints').map(l)
    const shades = generatePalette(base, 'shades').map(l)
    for (let i = 1; i < 5; i++) {
      expect(tints[i]).toBeGreaterThan(tints[i - 1])
      expect(shades[i]).toBeLessThan(shades[i - 1])
    }
  })

  it('only emits valid hex', () => {
    for (const mode of ['complementary', 'analogous', 'triadic', 'tints', 'shades'] as const) {
      for (const c of generatePalette('#00ff00', mode)) expect(c).toMatch(/^#[0-9a-f]{6}$/)
    }
  })
})
