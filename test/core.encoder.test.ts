import { getNewState } from '../src/core/actions'
import {
  serialize,
  deserialize,
  ascToBin5,
  bin5ToAsc,
  bin5ToHex,
  hexToBin5,
  ascToHex,
  hexToAsc,
} from '../src/core/encoder'

test('ASCII to bin', () => {
  expect(ascToBin5('05az')).toBe('00000001010011011111')
})

test('bin to ASCII', () => {
  expect(bin5ToAsc('00000001010011011111')).toBe('05az')
})
test('bin to hex', () => {
  expect(bin5ToHex('0011011001')).toBe('364')
})

test('hex to bin', () => {
  expect(hexToBin5('364')).toBe('0011011001')
})

test('correctly encode/decode string', () => {
  expect(hexToAsc(ascToHex('1234lmno'))).toBe('1234lmno')
})

test('correctly serialize/deserialize state', () => {
  const state = getNewState()
  expect(deserialize(serialize(state))).toEqual(state)
})
