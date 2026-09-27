import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  afterEach(cleanup)

  beforeEach(() => {
    history.replaceState(null, '', '/#c=ff8800&fg=000000&bg=ffffff')
    localStorage.clear()
  })

  it('restores state from the hash and shows conversions', () => {
    render(<App />)
    expect(screen.getByLabelText('Base color')).toHaveProperty('value', '#ff8800')
    expect(screen.getByText('rgb(255, 136, 0)')).toBeTruthy()
    expect(screen.getByText('21.00')).toBeTruthy()
  })

  it('updates hash on edit and saves palettes to localStorage', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('Base color'), { target: { value: 'rebeccapurple' } })
    expect(location.hash).toBe('#c=663399&fg=000000&bg=ffffff')
    expect(screen.getByText('rgb(102, 51, 153)')).toBeTruthy()

    act(() => screen.getByText('Save palette').click())
    const saved = JSON.parse(localStorage.getItem('color-explorer:palettes')!)
    expect(saved).toHaveLength(1)
    expect(saved[0].base).toBe('#663399')
  })

  it('flags invalid input without losing the last valid color', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('Base color'), { target: { value: 'nope' } })
    expect(screen.getByText(/Not a valid CSS color/)).toBeTruthy()
    expect(location.hash).toContain('c=ff8800')
  })
})
