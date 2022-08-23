export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

export type NumberStringArgument = number | 'inclusive'

export type TypeOrArrayOfType<T> = T | T[]

export type Detailed<D extends boolean> = D extends true
  ? true
  : false | undefined

export type NumberString<T extends NumberStringArgument = 'inclusive'> =
  T extends 'inclusive' ? number | `${number}` : number
