/// <reference types='../src/types' />

import { play } from '../src/core/wordle'

test('immutable state in play()', () => {
  const initState = play()
  const nextState = play(initState, 'enter')
  expect(nextState).not.toBe(initState)
})
