import { useCallback, useEffect, useState } from 'react'
import type { Hex } from '../lib/color'
import { loadPalettes, savePalettes, type SavedPalette } from '../lib/storage'

export function useSavedPalettes() {
  const [palettes, setPalettes] = useState<SavedPalette[]>(loadPalettes)

  useEffect(() => savePalettes(palettes), [palettes])

  const add = useCallback((name: string, base: Hex, colors: Hex[]) => {
    const p: SavedPalette = { id: crypto.randomUUID(), name, base, colors, createdAt: Date.now() }
    setPalettes((ps) => [p, ...ps])
  }, [])

  const remove = useCallback((id: string) => {
    setPalettes((ps) => ps.filter((p) => p.id !== id))
  }, [])

  return { palettes, add, remove }
}
