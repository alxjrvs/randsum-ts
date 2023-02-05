import {
  CustomSidesDie,
  InternalRollParameters,
  RollResult,
  StandardDie
} from '../types'
import applyModifiers from './applicators'
import coreRandomFactory from './core-random-factory'
import makeRolls from './make-rolls'

const generateResult = ({
  faces,
  sides,
  quantity,
  ...restParams
}: InternalRollParameters):
  | Omit<RollResult<CustomSidesDie>, 'arguments'>
  | Omit<RollResult<StandardDie>, 'arguments'> => {
  const rollOne = coreRandomFactory(sides)

  const initialRolls = makeRolls(quantity, rollOne)
  const rollParameters = { faces, sides, quantity, ...restParams, initialRolls }
  const { rolls, simpleMathModifier } = applyModifiers(rollParameters, rollOne)

  if (faces === undefined) {
    return {
      rollParameters,
      total:
        Number([...rolls].reduce((total, roll) => total + roll, 0)) +
        simpleMathModifier,
      rolls
    }
  }

  const customRolls = rolls.map((roll) => faces[roll - 1])
  return { rollParameters, total: customRolls.join(', '), rolls: customRolls }
}

export default generateResult
