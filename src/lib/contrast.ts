import { wcagContrast } from 'culori'
import type { Hex } from './color'

export function ratio(a: Hex, b: Hex): number {
  return wcagContrast(a, b)
}

export interface WcagResult {
  AA: boolean
  AAA: boolean
  AALarge: boolean
  AAALarge: boolean
}

export function wcag(r: number): WcagResult {
  return { AA: r >= 4.5, AAA: r >= 7, AALarge: r >= 3, AAALarge: r >= 4.5 }
}

/** Black or white, whichever reads better on `bg`. */
export function readableText(bg: Hex): Hex {
  return ratio(bg, '#000000') >= ratio(bg, '#ffffff') ? '#000000' : '#ffffff'
}
