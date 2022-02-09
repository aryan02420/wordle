import { getRandomSolution, isValidWord } from './words.js'

namespace Wordle {

  type alphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' |
                  'g' | 'h' | 'i' | 'j' | 'k' | 'l' |
                  'm' | 'n' | 'o' | 'p' | 'q' | 'r' |
                  's' | 't' | 'u' | 'v' | 'w' | 'x' |
                  'y' | 'z'
  type Tuple5<T> = [T, T, T, T, T]
  type Tuple6<T> = [T, T, T, T, T, T]
  type TWord = Tuple5<alphabet | null>
  type TGuesses = Tuple6<TWord>
  enum EFeedback {
    empty = 0,
    absent,
    present,
    correct
  }
  type TFeedback = Tuple5<EFeedback>
  type TFeedbacks = Tuple6<TFeedback>
  interface IKeyboard {
    absent: alphabet[]
    present: alphabet[]
    correct: alphabet[]
  }
  interface IState {
    guess: TGuesses
    feedback: TFeedbacks
    keyboard: IKeyboard
    rowIndex: number
    colIndex: number
    solution: Tuple5<alphabet>
  }

  function start(seed: string): IState {
    return {
      guess: [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ],
      feedback: [
        [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
        [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
        [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
        [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
        [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
        [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
      ],
      keyboard: {
        absent: [],
        present: [],
        correct: [],
      },
      rowIndex: 0,
      colIndex: 0,
      solution: getRandomSolution().split('') as Tuple5<alphabet>
    }
  }

  function encode(state: IState): string {
    return Buffer.from(JSON.stringify(state), 'binary').toString('base64')
  }

  function decode(str: string): IState {
    return JSON.parse(Buffer.from(str, 'base64').toString('binary')) as IState
  }

  function action(state: IState, move: string): IState {

    return state
  }
}

export default Wordle