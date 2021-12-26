import { parseNotation } from 'parseArguments/parseNotation'
import { DiceNotation, NumberString, RollOptions, RollParameters, UserOptions } from 'types'
import { diceNotationPattern } from 'utils'

import { convertOptionsToParameters } from './convertOptionsToParameters'

function isRollOptions(argument: NumberString | RollOptions | DiceNotation): argument is RollOptions {
  return typeof argument === 'object'
}

function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!diceNotationPattern.test(String(argument))
}

export function parseArguments(
  primeArgument: NumberString | RollOptions | DiceNotation,
  secondArgument: Omit<RollOptions & UserOptions, 'sides'> = {},
): RollParameters & UserOptions {
  const secondaryParameters = convertOptionsToParameters(secondArgument)

  if (isDiceNotation(primeArgument)) {
    return { ...secondaryParameters, ...parseNotation(primeArgument) }
  }

  if (isRollOptions(primeArgument)) {
    return { sides: 0, rolls: 1, ...secondaryParameters, ...convertOptionsToParameters(primeArgument) }
  }

  const sides = Number(primeArgument)

  if (Number.isNaN(Number(sides))) {
    throw new TypeError(`Bad Argument: ${String(primeArgument)}`)
  }

  return { sides, rolls: 1, ...secondaryParameters }
}
