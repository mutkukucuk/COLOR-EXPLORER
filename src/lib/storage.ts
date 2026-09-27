import type { Hex } from './color'

export interface SavedPalette {
  id: string
  name: string
  base: Hex
  colors: Hex[]
  createdAt: number
}

const KEY = 'color-explorer:palettes'

export function loadPalettes(): SavedPalette[] {
  try {
    const raw = localStorage.getItem(KEY)
    const data = raw ? JSON.parse(raw) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function savePalettes(palettes: SavedPalette[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(palettes))
  } catch {
    // Storage unavailable (private mode, quota) — palettes stay in memory only.
  }
}
