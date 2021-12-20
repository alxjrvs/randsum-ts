import { RollParameters } from 'types'
import { randomNumber } from 'utils'
import { rollModifierApplicator } from './rollModifierApplicator'

export function calculateTotal(rollParameters: RollParameters) {
  const { sides, rolls, accessor, ...params } = rollParameters

  const rollTotals = Array.from(Array(rolls)).map(() => randomNumber(sides))

  if (accessor) {
    if (Object.keys(params).length > 0) {
      console.warn('When provided a callback, randsum ignores all other modifiers besides Sides and # of dice rolled.')
    }

    return {
      total: accessor(rollTotals),
      rollTotals,
    }
  }

  const total = rollModifierApplicator(rollTotals, rollParameters)

  return {
    total,
    rollTotals,
  }
}
