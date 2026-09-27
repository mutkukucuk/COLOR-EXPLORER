import { useCallback, useState } from 'react'

/** Copy text to the clipboard; `copied` holds the last copied value for ~1.2s. */
export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1200)
    } catch {
      // Clipboard blocked; nothing sensible to do.
    }
  }, [])
  return { copied, copy }
}
