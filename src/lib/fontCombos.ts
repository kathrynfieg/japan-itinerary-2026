export type FontComboId =
  | 'instrument'
  | 'zalando-source'
  | 'baskerville-source'
  | 'archivo-instrument'

export type TripFontCombo = {
  id: FontComboId
  comboNum: number
  label: string
  name: string
  heading: string
  body: string
  blurb: string
  headingStretch?: string
  headingWeight?: string | number
  headingUppercase?: boolean
}

export const DEFAULT_FONT_COMBO: FontComboId = 'archivo-instrument'

export const TRIP_FONT_COMBOS: TripFontCombo[] = [
  {
    id: 'instrument',
    comboNum: 1,
    label: 'Combo 1',
    name: 'Instrument Serif + Instrument Sans',
    heading: "'Instrument Serif', Georgia, serif",
    body: "'Instrument Sans', ui-sans-serif, sans-serif",
    blurb: 'Editorial serif headlines with a clean, friendly sans.',
  },
  {
    id: 'zalando-source',
    comboNum: 3,
    label: 'Combo 3',
    name: 'Zalando Sans Expanded + Source Sans',
    heading: "'Zalando Sans', ui-sans-serif, sans-serif",
    body: "'Source Sans 3', ui-sans-serif, sans-serif",
    headingStretch: '125%',
    blurb: 'Wide grotesk headlines — bold and distinctive.',
  },
  {
    id: 'baskerville-source',
    comboNum: 11,
    label: 'Combo 11',
    name: 'Libre Baskerville + Source Sans',
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'Source Sans 3', ui-sans-serif, sans-serif",
    blurb: 'Classic book serif with a humanist sans body.',
  },
  {
    id: 'archivo-instrument',
    comboNum: 18,
    label: 'Combo 18',
    name: 'Archivo Black + Instrument Sans',
    heading: "'Archivo Black', ui-sans-serif, sans-serif",
    body: "'Instrument Sans', ui-sans-serif, sans-serif",
    blurb: 'Heavy grotesk display with the current Daymark body sans.',
  },
]

export function fontComboStyle(
  id: FontComboId | undefined,
): Record<string, string> {
  const combo =
    TRIP_FONT_COMBOS.find((item) => item.id === id) ??
    TRIP_FONT_COMBOS.find((item) => item.id === DEFAULT_FONT_COMBO)!

  const style: Record<string, string> = {
    '--display': combo.heading,
    '--sans': combo.body,
  }

  if (combo.headingStretch) {
    style['--display-stretch'] = combo.headingStretch
  }
  if (combo.headingWeight != null) {
    style['--display-weight'] = String(combo.headingWeight)
  }
  if (combo.headingUppercase) {
    style['--display-transform'] = 'uppercase'
  }

  return style
}
