import { describe, expect, it } from 'bun:test'
import validateNotation from '../src/validate-dice-notation'
import { DiceNotation, DicePoolType } from '../src'

describe('validateNotation', () => {
  describe('when the notation is completely invalid', () => {
    const notation = 'invalid-notation'

    it('returns an error result', () => {
      const result = validateNotation(notation)

      expect(result).toEqual({
        valid: false,
        description: []
      })
    })
  })

  describe('when given a typesafe but incorrect dice notation', () => {
    const notation: DiceNotation<number> = '2d5XXddf'

    it('returns an error result', () => {
      const result = validateNotation(notation)

      expect(result).toEqual({
        valid: false,
        description: []
      })
    })
  })

  describe('when given comma-less multiple dice notation', () => {
    const notations: DiceNotation<number>[] = [
      '2d5D{2>2}',
      '2d5V{1=2>2=2}',
      '2d5R{2>2}',
      '2d5U{2>2}'
    ]

    notations.forEach((notation) => {
      it(`returns an error result for ${notation}`, () => {
        const result = validateNotation(notation)

        expect(result).toEqual({
          valid: false,
          description: []
        })
      })
    })
  })

  describe('when given a nonsensical drop notation that is bugging me', () => {
    const notation: DiceNotation<number> = '2d5D'

    it('returns an error result', () => {
      const result = validateNotation(notation)

      expect(result).toEqual({
        valid: false,
        description: []
      })
    })
  })

  describe('when given a standard notation', () => {
    it('returns a valid result', () => {
      const notation = '2d6'
      const result = validateNotation(notation)

      expect(result).toEqual({
        valid: true,
        notation: '2d6',
        type: DicePoolType.standard,
        digested: { sides: 6, quantity: 2, modifiers: {} },
        description: ['Roll 2 6-sided dice']
      })
    })
  })

  describe('when given a custom sides notation', () => {
    it('returns a valid result', () => {
      const notation = '2d{ht}'
      const result = validateNotation(notation)

      expect(result).toEqual({
        valid: true,
        notation: '2d{ht}',
        type: DicePoolType.custom,
        digested: { sides: ['h', 't'], quantity: 2, modifiers: {} },
        description: ['Roll 2 dice with the following sides: (h,t)']
      })
    })
  })
})