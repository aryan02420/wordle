/// <reference types='../src/types' />

import {
  getNewState,
  removeAlphabet,
  addAplhabet,
  evaluateGuess,
  updateKeyboard,
  submitGuess,
} from '../src/core/actions'

describe('removeAlphabet', () => {
  describe('delete last character', () => {
    const state = getNewState()
    state.row = 0
    state.col = 3
    state.msg = EMessages.less
    state.wrd[0] = ['a', 'b', 'c', null, null]

    const result = removeAlphabet(state)

    test('decrement column', () => {
      expect(result.col).toBe(2)
    })

    test('delete char from array', () => {
      expect(result.wrd[0]).toEqual(['a', 'b', null, null, null])
    })

    test('clear message', () => {
      expect(result.msg).toBe(EMessages.none)
    })
  })

  describe('do nothing when no char left in current guess', () => {
    const state = getNewState()
    state.row = 1
    state.col = 0
    state.msg = EMessages.less
    state.wrd[0] = ['a', 'b', 'c', 'd', 'e']
    state.wrd[1] = [null, null, null, null, null]

    const result = removeAlphabet(state)

    test('do not change col', () => {
      expect(result.col).toBe(0)
    })

    test('do not change row', () => {
      expect(result.row).toBe(1)
    })

    test('clear message', () => {
      expect(result.msg).toBe(EMessages.none)
    })
  })
})

describe('addAlphabet', () => {
  describe('add character', () => {
    const state = getNewState()
    state.row = 0
    state.col = 3
    state.msg = EMessages.less
    state.wrd[0] = ['a', 'b', 'c', null, null]

    const result = addAplhabet(state, 'd')

    test('increment column', () => {
      expect(result.col).toBe(4)
    })

    test('add char to array', () => {
      expect(result.wrd[0]).toEqual(['a', 'b', 'c', 'd', null])
    })

    test('clear message', () => {
      expect(result.msg).toBe(EMessages.none)
    })
  })

  describe('do nothing when current guess is full', () => {
    const state = getNewState()
    state.row = 0
    state.col = 5
    state.msg = EMessages.invalid
    state.wrd[0] = ['a', 'b', 'c', 'd', 'e']

    const result = addAplhabet(state, 'f')

    test('do not change col', () => {
      expect(result.col).toBe(5)
    })

    test('do not change row', () => {
      expect(result.row).toBe(0)
    })

    test('clear message', () => {
      expect(result.msg).toBe(EMessages.none)
    })
  })
})

describe('submitGuess #1', () => {
  describe('show error when <5 chars', () => {
    const state = getNewState()
    state.row = 0
    state.col = 3
    state.msg = EMessages.none
    state.wrd[0] = ['a', 'b', 'c', null, null]

    const result = submitGuess(state)

    test('do not change col', () => {
      expect(result.col).toBe(3)
    })

    test('do not change row', () => {
      expect(result.row).toBe(0)
    })

    test('show message', () => {
      expect(result.msg).toBe(EMessages.less)
    })
  })

  describe('show error when not a word', () => {
    const state = getNewState()
    state.row = 0
    state.col = 5
    state.msg = EMessages.none
    state.wrd[0] = ['a', 'b', 'c', 'd', 'e']

    const result = submitGuess(state)

    test('do not change col', () => {
      expect(result.col).toBe(5)
    })

    test('do not change row', () => {
      expect(result.row).toBe(0)
    })

    test('show message', () => {
      expect(result.msg).toBe(EMessages.invalid)
    })
  })
})

describe('evaluateGuess', () => {
  test('correct evaluation #1', () => {
    expect(
      evaluateGuess(['s', 'p', 'e', 'e', 'd'], ['a', 'b', 'i', 'd', 'e'])
    ).toEqual([
      EFeedback.absent,
      EFeedback.absent,
      EFeedback.present,
      EFeedback.absent,
      EFeedback.present,
    ])
  })

  test('correct evaluation #2', () => {
    expect(
      evaluateGuess(['s', 'p', 'e', 'e', 'd'], ['e', 'r', 'a', 's', 'e'])
    ).toEqual([
      EFeedback.present,
      EFeedback.absent,
      EFeedback.present,
      EFeedback.present,
      EFeedback.absent,
    ])
  })

  test('correct evaluation #3', () => {
    expect(
      evaluateGuess(['s', 'p', 'e', 'e', 'd'], ['s', 't', 'e', 'a', 'l'])
    ).toEqual([
      EFeedback.correct,
      EFeedback.absent,
      EFeedback.correct,
      EFeedback.absent,
      EFeedback.absent,
    ])
  })

  test('correct evaluation #4', () => {
    expect(
      evaluateGuess(['s', 'p', 'e', 'e', 'd'], ['c', 'r', 'e', 'p', 'e'])
    ).toEqual([
      EFeedback.absent,
      EFeedback.present,
      EFeedback.correct,
      EFeedback.present,
      EFeedback.absent,
    ])
  })
})

describe('updateKeyboard', () => {
  test('keyboard showes highest information', () => {
    expect(
      updateKeyboard(
        {
          a: EFeedback.absent,
          b: EFeedback.correct,
          c: EFeedback.present,
          d: EFeedback.correct,
          e: EFeedback.present,
        } as TKeyboard,
        ['a', 'b', 'c', 'd', 'e'],
        [
          EFeedback.present,
          EFeedback.present,
          EFeedback.correct,
          EFeedback.correct,
          EFeedback.present,
        ]
      )
    ).toEqual({
      a: EFeedback.present,
      b: EFeedback.correct,
      c: EFeedback.correct,
      d: EFeedback.correct,
      e: EFeedback.present,
    })
  })
})

describe('submitGuess #2', () => {
  describe('incorrect guess', () => {
    const state = getNewState()
    state.row = 0
    state.col = 5
    state.msg = EMessages.none
    state.sol = ['m', 'o', 'u', 's', 'e']
    state.wrd[0] = ['t', 'o', 'm', 'm', 'y']

    const result = submitGuess(state)

    test('next row', () => {
      expect(result.row).toBe(1)
    })

    test('first col', () => {
      expect(result.col).toBe(0)
    })
  })

  describe('win game', () => {
    const state = getNewState()
    state.row = 2
    state.col = 5
    state.msg = EMessages.none
    state.sol = ['t', 'o', 'm', 'm', 'y']
    state.wrd[2] = ['t', 'o', 'm', 'm', 'y']

    const result = submitGuess(state)

    test('finish flag', () => {
      expect(result.fin).toBe(true)
    })

    test('set message', () => {
      expect(result.msg).toBe(EMessages.win)
    })

    test('change row', () => {
      expect(result.row).toBe(3)
    })

    test('change col', () => {
      expect(result.col).toBe(0)
    })
  })
})

describe('immutable states', () => {
  test('immutable keyboard', () => {
    const initKbd = {
      a: EFeedback.absent,
      b: EFeedback.correct,
      c: EFeedback.present,
      d: EFeedback.correct,
      e: EFeedback.present,
    } as TKeyboard
    const nextKbd = updateKeyboard(
      initKbd,
      ['a', 'b', 'c', 'd', 'e'],
      [
        EFeedback.present,
        EFeedback.absent,
        EFeedback.correct,
        EFeedback.correct,
        EFeedback.present,
      ]
    )
    expect(initKbd).not.toBe(nextKbd)
  })

  test('immutable add alphabet', () => {
    const initState = getNewState()
    const nextState = addAplhabet(initState, 'a')
    expect(initState).not.toBe(nextState)
  })
  
  test('immutable remove alphabet', () => {
    const initState = getNewState()
    initState.col = 5
    const nextState = removeAlphabet(initState)
    expect(initState).not.toBe(nextState)
  })
  
  test('immutable submit guess', () => {
    const initState = getNewState()
    initState.col = 5
    initState.wrd[0] = ['h', 'e', 'l', 'l', 'o']
    const nextState = submitGuess(initState)
    expect(initState).not.toBe(nextState)
  })
})
