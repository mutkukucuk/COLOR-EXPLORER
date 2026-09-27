import { useCallback, useEffect, useState } from 'react'
import { decodeState, encodeState, type ShareState } from '../lib/share'

const DEFAULTS: ShareState = { base: '#3b82f6', fg: '#1f2937', bg: '#ffffff' }

function fromHash(): ShareState {
  return { ...DEFAULTS, ...decodeState(location.hash) }
}

/** App color state, mirrored into the URL hash so any view is shareable. */
export function useColorState() {
  const [state, setState] = useState<ShareState>(fromHash)

  useEffect(() => {
    const next = encodeState(state)
    if (location.hash !== next) history.replaceState(null, '', next)
  }, [state])

  useEffect(() => {
    const onHash = () => setState(fromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const update = useCallback(
    (patch: Partial<ShareState>) => setState((s) => ({ ...s, ...patch })),
    [],
  )

  return [state, update] as const
}
