import { Modifier } from '../parse-arguments/types'
import { CustomSidesRollOptions, StandardRollOptions } from './options'
import { CustomSides, DieType } from './primitives'

type CoreRollParameters = {
  initialRolls: number[]
  modifiers: Array<Modifier<number>>
  quantity: number
}

export type StandardRollParameters = StandardRollOptions<number> &
  CoreRollParameters

export type CustomSidesRollParameters = Omit<
  CustomSidesRollOptions<number>,
  'sides'
> &
  CoreRollParameters & {
    sides: number
    faces: CustomSides
  }

export type RollParameters<N extends DieType = DieType> = N extends 'standard'
  ? StandardRollParameters
  : CustomSidesRollParameters
