export const THEME_ATTRIBUTE = 'data-theme'
export const CUSTOM_FONT_ATTRIBUTE = 'data-use-custom-font'

export const COLOR_TOKEN_NAMES = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
] as const

export type ColorTokenName = (typeof COLOR_TOKEN_NAMES)[number]

export function cssColorToken(name: ColorTokenName) {
  return `hsl(var(--${name}))`
}
