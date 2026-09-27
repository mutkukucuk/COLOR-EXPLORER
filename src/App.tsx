import { ColorPicker } from './components/ColorPicker'
import { ContrastChecker } from './components/ContrastChecker'
import { ConversionTable } from './components/ConversionTable'
import { PaletteGenerator } from './components/PaletteGenerator'
import { SavedPalettes } from './components/SavedPalettes'
import { useColorState } from './hooks/useColorState'
import { useSavedPalettes } from './hooks/useSavedPalettes'
import { shareUrl } from './lib/share'

export default function App() {
  const [state, update] = useColorState()
  const { palettes, add, remove } = useSavedPalettes()
  const setBase = (base: string) => update({ base })

  return (
    <>
      <header className="app-header">
        <span className="brand-dot" style={{ background: state.base }} />
        <h1>Color Explorer</h1>
      </header>
      <main className="grid">
        <section className="card">
          <h2>Color</h2>
          <div className="hero-swatch" style={{ background: state.base }} />
          <ColorPicker label="Base color" value={state.base} onChange={setBase} />
          <ConversionTable color={state.base} />
        </section>
        <section className="card">
          <h2>Palette</h2>
          <PaletteGenerator base={state.base} onSelect={setBase} onSave={add} />
        </section>
        <section className="card">
          <h2>Contrast</h2>
          <ContrastChecker fg={state.fg} bg={state.bg} onChange={update} />
        </section>
        <section className="card">
          <h2>Saved &amp; share</h2>
          <SavedPalettes palettes={palettes} onLoad={setBase} onRemove={remove} shareLink={shareUrl(state)} />
        </section>
      </main>
    </>
  )
}
