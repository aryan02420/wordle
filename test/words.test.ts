import { SolutionWords, ValidWords, getRandomSolution, isValidWord } from '../src/words'

test('return random word', () => {
    expect(getRandomSolution()).not.toBe(getRandomSolution())
})

test('solution word is valid word', () => {
    expect(isValidWord(SolutionWords[0])).toBe(true)
})

test('valid word is valid word', () => {
    expect(isValidWord(ValidWords[0])).toBe(true)
})

test('non word is invalid', () => {
    expect(isValidWord('aaaaa')).toBe(false)
})
