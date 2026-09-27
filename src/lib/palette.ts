import { clampChroma, converter, formatHex } from 'culori'
import type { Hex } from './color'

const toOklch = converter('oklch')

export const PALETTE_MODES = ['complementary', 'analogous', 'triadic', 'tints', 'shades'] as const
export type PaletteMode = (typeof PALETTE_MODES)[number]

const HUE_OFFSETS: Record<'complementary' | 'analogous' | 'triadic', number[]> = {
  complementary: [0, 180],
  analogous: [-60, -30, 0, 30, 60],
  triadic: [0, 120, 240],
}

function fromOklch(l: number, c: number, h: number): Hex {
  return formatHex(clampChroma({ mode: 'oklch', l, c, h }, 'oklch'))
}

export function rotateHue(hex: Hex, degrees: number): Hex {
  const { l, c, h = 0 } = toOklch(hex)!
  return fromOklch(l, c, (((h + degrees) % 360) + 360) % 360)
}

export function generatePalette(hex: Hex, mode: PaletteMode, steps = 5): Hex[] {
  if (mode === 'tints' || mode === 'shades') {
    const { l, c, h = 0 } = toOklch(hex)!
    const target = mode === 'tints' ? 0.98 : 0.15
    return Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1)
      // Fade chroma toward the extreme so tints/shades don't oversaturate.
      return fromOklch(l + (target - l) * t, c * (1 - t * 0.7), h)
    })
  }
  return HUE_OFFSETS[mode].map((d) => (d === 0 ? hex : rotateHue(hex, d)))
}
