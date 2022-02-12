import { removeAlphabet, addAplhabet, submitGuess } from '../src/utils'


test('backspace deletes last character', () => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: '',
    }
    const stateNew = {
        row: 0,
        col: 2,
        wrd: [['a', 'b', null, null, null]],
        msg: '',
    }
    // @ts-ignore
    expect(removeAlphabet(state)).toEqual(stateNew)
})

test('backspace does nothing when no alphabet in current guess', () => {
    const state = {
        row: 1,
        col: 0,
        wrd: [['a', 'b', 'c', 'd', 'e'], [null, null, null, null, null]],
        msg: '',
    }
    const stateNew = {
        row: 1,
        col: 0,
        wrd: [['a', 'b', 'c', 'd', 'e'], [null, null, null, null, null]],
        msg: '',
    }
    // @ts-ignore
    expect(removeAlphabet(state)).toEqual(stateNew)
})

test('backspace clears message', () => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: 'some error msg',
    }
    // @ts-ignore
    expect(removeAlphabet(state).msg).toBe('')
})

test('alphabet adds a new character', () => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: '',
    }
    const stateNew = {
        row: 0,
        col: 4,
        wrd: [['a', 'b', 'c', 'd', null]],
        msg: '',
    }
    // @ts-ignore
    expect(addAplhabet(state, 'd')).toEqual(stateNew)
})

test('alphabet does nothing when current guess is full', () => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: '',
    }
    const stateNew = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: '',
    }
    // @ts-ignore
    expect(addAplhabet(state, 'd')).toEqual(stateNew)
})

test('alphabet clears message', () => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: 'some error message',
    }
    // @ts-ignore
    expect(addAplhabet(state, 'd').msg).toBe('')
})

test('show error when <5 chars' ,() => {
    const state = {
        row: 0,
        col: 3,
        wrd: [['a', 'b', 'c', null, null]],
        msg: '',
    }
    // @ts-ignore
    expect(submitGuess(state).msg).toBeTruthy
})

test('show error when not a word' ,() => {
    const state = {
        row: 0,
        col: 5,
        wrd: [['a', 'b', 'c', 'd', 'e']],
        msg: '',
    }
    // @ts-ignore
    expect(submitGuess(state).msg).toBeTruthy
})