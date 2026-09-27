import { formats, type Hex } from '../lib/color'
import { useCopy } from '../hooks/useCopy'

export function ConversionTable({ color }: { color: Hex }) {
  const { copied, copy } = useCopy()
  const rows = Object.entries(formats(color))

  return (
    <table className="conversions">
      <tbody>
        {rows.map(([name, value]) => (
          <tr key={name}>
            <th scope="row">{name.toUpperCase()}</th>
            <td>
              <code>{value}</code>
            </td>
            <td>
              <button type="button" onClick={() => copy(value)}>
                {copied === value ? 'Copied' : 'Copy'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
