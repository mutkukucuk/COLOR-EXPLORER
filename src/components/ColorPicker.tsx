import { useId, useState } from 'react'
import { parseColor, type Hex } from '../lib/color'

interface Props {
  label: string
  value: Hex
  onChange: (hex: Hex) => void
}

/** Native swatch picker plus a text field that accepts any CSS color. */
export function ColorPicker({ label, value, onChange }: Props) {
  const id = useId()
  const [text, setText] = useState(value)
  const [invalid, setInvalid] = useState(false)
  const [prevValue, setPrevValue] = useState(value)

  // Keep the text field in sync when the value changes from elsewhere.
  if (value !== prevValue) {
    setPrevValue(value)
    if (parseColor(text) !== value) setText(value)
    setInvalid(false)
  }

  const commitText = (input: string) => {
    setText(input)
    const hex = parseColor(input)
    setInvalid(!hex && input.trim() !== '')
    if (hex && hex !== value) onChange(hex)
  }

  return (
    <div className="picker">
      <label htmlFor={id}>{label}</label>
      <div className="picker-row">
        <input
          type="color"
          aria-label={`${label} swatch`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          id={id}
          type="text"
          spellCheck={false}
          value={text}
          aria-invalid={invalid}
          onChange={(e) => commitText(e.target.value)}
          onBlur={() => invalid || setText(value)}
        />
      </div>
      {invalid && <p className="error">Not a valid CSS color. Showing last valid color.</p>}
    </div>
  )
}
