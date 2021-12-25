export type D = 'd' | 'D'
export type Sides = number | `${number}`
export type DiceNotation = `${number}${D}${number}${string}`

export type RollDie = () => number
export type Randomizer = (sides: number) => number

export type RollTotals = number[]
export type RollParser = (results: RollTotals) => RollTotals

export type RollModifier = (results: RollTotals) => number
export type RollModifierAccessor = (callback: RollModifier) => number

export interface RandsumOptions<D = boolean> {
  detailed?: D
  customRandomizer?: Randomizer
}

export interface DropOptions {
  highest?: number
  lowest?: number
  greaterThan?: number
  lessThan?: number
  exact?: number[]
}

export interface CapOptions {
  above?: number
  below?: number
}

export interface ReRollOptions extends CapOptions {
  on?: number | number[]
  maxReroll?: number
}

export interface ReplaceOptions {
  from: number | CapOptions
  to: number
}

export interface UniqueOptions {
  notUnique: number[]
}

export interface RollOptions {
  rolls?: number
  sides: number
  plus?: number
  minus?: number
  cap?: CapOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: ReRollOptions | ReRollOptions[]
  unique?: boolean | UniqueOptions
  explode?: boolean
}

export interface RollParameters extends RollOptions {
  rolls: number
  notation?: string
}

export type RandsumPrimeArgument = Sides | RollOptions | DiceNotation
export interface RollResult extends RollParameters {
  args: [RandsumPrimeArgument, RandsumOptions | undefined]
  total: number
  rollTotals: number[]
  initialRollTotals: number[]
  modifyInitialRolls: RollModifierAccessor
  modifyModifiedRolls: RollModifierAccessor
}

export type RandsumDynamicReturn<T extends boolean> = T extends true ? RollResult : number