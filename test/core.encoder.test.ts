import { getNewState } from '../src/core/actions'
import {
  serialize,
  deserialize,
  binToB32,
  b32ToBin,
} from '../src/core/encoder'

// test('bin to base32', () => {
//   expect(binToB32('01')).toBe('05az')
// })

// test('b32 to bin', () => {
//   expect(binToB32('05az')).toBe('00000001010011011111')
// })

// test('bin to hex', () => {
//   expect(bin5ToHex('0011011001')).toBe('364')
// })

// test('hex to bin', () => {
//   expect(hexToBin5('364')).toBe('0011011001')
// })

// test('correctly encode/decode string', () => {
//   expect(hexToAsc(ascToHex('1234lmno'))).toBe('1234lmno')
// })

test('correctly serialize/deserialize state #1', () => {
  const state = getNewState()
  expect(deserialize(serialize(state))).toEqual(state)
})

test('correctly serialize/deserialize state #2', () => {
  const state = getNewState()
  const s1 = serialize(state)
  const s2 = serialize(deserialize(s1)) 
  expect(s1).toEqual(s2)
})

// test('correctly serialize/deserialize state #2', () => {
//   const state = '18023c4752a8401004000002018c201802300c0000408b9a6a7ea55f623a95421084211084118c6318'
//   expect(serialize(deserialize(state))).toEqual(state)
// })
