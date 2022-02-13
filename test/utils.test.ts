/// <reference types='../src/types' />

import { removeAlphabet, addAplhabet, submitGuess } from '../src/utils'


test('backspace deletes last character', () => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: EMessages.none,
    }
    const stateNew = {
        row: 0,
        col: 2,
        wrd: [['a', 'b', null, null, null]],
        msg: EMessages.none,
    }
    // @ts-ignore
    expect(removeAlphabet(state)).toEqual(stateNew)
})

test('backspace does nothing when no alphabet in current guess', () => {
    const state = {
        row: 1,
        col: 0,
        wrd: [['a', 'b', 'c', 'd', 'e'], [null, null, null, null, null]],
        msg: EMessages.none,
    }
    const stateNew = {
        row: 1,
        col: 0,
        wrd: [['a', 'b', 'c', 'd', 'e'], [null, null, null, null, null]],
        msg: EMessages.none,
    }
    // @ts-ignore
    expect(removeAlphabet(state)).toEqual(stateNew)
})

test('backspace clears message', () => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: EMessages.invalid,
    }
    // @ts-ignore
    expect(removeAlphabet(state).msg).toBe(0)
})

test('alphabet adds a new character', () => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: EMessages.none,
    }
    const stateNew = {
        row: 0,
        col: 4,
        wrd: [['a', 'b', 'c', 'd', null]],
        msg: EMessages.none,
    }
    // @ts-ignore
    expect(addAplhabet(state, 'd')).toEqual(stateNew)
})

test('alphabet does nothing when current guess is full', () => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: EMessages.none,
    }
    const stateNew = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: EMessages.none,
    }
    // @ts-ignore
    expect(addAplhabet(state, 'd')).toEqual(stateNew)
})

test('alphabet clears message', () => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: EMessages.less,
    }
    // @ts-ignore
    expect(addAplhabet(state, 'd').msg).toBe(0)
})

test('show error when <5 chars', () => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: EMessages.none,
    }
    // @ts-ignore
    expect(submitGuess(state).msg).toBe(1)
})

test('show error when not a word', () => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: EMessages.none,
    }
    // @ts-ignore
    expect(submitGuess(state).msg).toBe(2)
})

test('show correct feedback #1', () => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['t', 'o', 'm', 'm', 'y']],
        fbk: [[0, 0, 0, 0, 0]],
        kbd: {
            t: 0,
            o: 0,
            m: 0,
            y: 0,
        },
        msg: EMessages.none,
        sol: ['m', 'o', 'u', 's', 'e'],
        fin: false,
    }
    const stateNew = {
        row: 1,
        col: 0,
        fbk: [[1, 3, 2, 2, 1]],
        kbd: {
            t: 1,
            o: 3,
            m: 2,
            y: 1,
        },
    }
    // @ts-ignore
    expect(submitGuess(state)).toEqual(expect.objectContaining(stateNew))
})

test('show correct feedback #2', () => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['l', 'e', 'm', 'o', 'n']],
        fbk: [[0, 0, 0, 0, 0]],
        kbd: {
            l: 0,
            e: 0,
            m: 0,
            o: 0,
            n: 0,
        },
        msg: EMessages.none,
        sol: ['m', 'o', 't', 'o', 'r'],
        fin: false,
    }
    const stateNew = {
        row: 1,
        col: 0,
        fbk: [[1, 1, 2, 3, 1]],
        kbd: {
            l: 1,
            e: 1,
            m: 2,
            o: 3,
            n: 1,
        },
    }
    // @ts-ignore
    expect(submitGuess(state)).toEqual(expect.objectContaining(stateNew))
})

test('win game', () => {
    const state = {
        row: 1,
        col: 5,
        wrd: [['t', 'o', 'm', 'm', 'y'], ['m', 'o', 'u', 's', 'e']],
        fbk: [[1, 3, 2, 2, 1], [0, 0, 0, 0, 0]],
        kbd: {
            t: 1,
            o: 3,
            m: 2,
            y: 1,
            u: 0,
            s: 0,
            e: 0,
        },
        msg: EMessages.none,
        sol: ['m', 'o', 'u', 's', 'e'],
        fin: false,
    }
    const stateNew = {
        row: 1,
        col: 5,
        fbk: [[1, 3, 2, 2, 1], [3, 3, 3, 3, 3]],
        kbd: {
            t: 1,
            o: 3,
            m: 3,
            y: 1,
            u: 3,
            s: 3,
            e: 3,
        },
        fin: true,

    }
    // @ts-ignore
    const stateRet = submitGuess(state)
    expect(stateRet).toEqual(expect.objectContaining(stateNew))
    expect(stateRet.fin).toBe(true)
    expect(stateRet.msg).toBe(EMessages.win)
})

