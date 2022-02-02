namespace Wordle {
  type Tuple5<T> = [T, T, T, T, T]
  type Tuple6<T> = [T, T, T, T, T, T]
  type TWord = Tuple5<string>
  type TGuesses = Tuple6<TWord>
  enum EFeedback {
    empty = 0,
    incorrect,
    position,
    correct
  }
  type TFeedback = Tuple5<EFeedback>
  type TFeedbacks= Tuple6<TFeedback>
  interface IKeyboard {
    empty: string[]
    incorrect: string []
    position: string []
    correct: string []
  }
  interface IState {
    guess: TGuesses
    feedback :TFeedbacks
    keyboard: IKeyboard
    rowIndex: number
    colIndex: number
    solution: TWord
  }
  function start(seed: string): IState {
    return {} as IState
  }
  function encode(state: IState): string {
    return ''
  }
  function decode(str: string): IState {
    return {} as IState
  }
  function action(state: IState, move: string): IState {
    return state
  }
}

export default Wordle