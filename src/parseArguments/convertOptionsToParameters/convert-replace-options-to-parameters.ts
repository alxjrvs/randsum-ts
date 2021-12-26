import { ReplaceOptions } from 'types'

import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'

export function convertReplaceOptionsToParameters({ from, to }: ReplaceOptions): ReplaceOptions<'strict'> {
  return {
    from: typeof from === 'object' ? convertCapOptionsToParameters(from) : Number(from),
    to: Number(to),
  }
}