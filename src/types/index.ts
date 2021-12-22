export type RollModifier = (results: number[]) => number
export type RollModifierAccessor = (callback: RollModifier) => number
export type RollTotals = number[]
export type RandsumPrimeArg = string | number | RollOptions
export type Randomizer = (sides: number) => number
export type RollDie = () => number
export type RollResultOrNum<T> = T extends true ? RollResult : number
export type NotationModifiers = Partial<RollParameters>[]

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

export interface RollOptions {
  plus?: number
  minus?: number
  cap?: CapOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: ReRollOptions | ReRollOptions[]
  rolls?: number
  detailed?: boolean
  unique?: boolean
  explode?: boolean
  notUnique?: number[]
  rollTotals?: RollTotals
  sides: number
}

export interface RollParameters extends RollOptions {
  rolls: number
  notationModifiers?: NotationModifiers
}

export interface RollResult extends RollParameters {
  total: number
  rollTotals: number[]
  initialRollTotals: number[]
  modifyInitialRoll: RollModifierAccessor
  modifyModifiedRoll: RollModifierAccessor
}
