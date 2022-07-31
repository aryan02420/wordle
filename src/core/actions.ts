import { produce } from "immer"
import { getRandomSolution, isValidWord } from './words'

export function getNewState(seed?: any): IState {
  return {
    wrd: [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ],
    fbk: [
      [
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
      ],
      [
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
      ],
      [
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
      ],
      [
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
      ],
      [
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
      ],
      [
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
        EFeedback.empty,
      ],
    ],
    kbd: {
      a: EFeedback.empty,
      b: EFeedback.empty,
      c: EFeedback.empty,
      d: EFeedback.empty,
      e: EFeedback.empty,
      f: EFeedback.empty,
      g: EFeedback.empty,
      h: EFeedback.empty,
      i: EFeedback.empty,
      j: EFeedback.empty,
      k: EFeedback.empty,
      l: EFeedback.empty,
      m: EFeedback.empty,
      n: EFeedback.empty,
      o: EFeedback.empty,
      p: EFeedback.empty,
      q: EFeedback.empty,
      r: EFeedback.empty,
      s: EFeedback.empty,
      t: EFeedback.empty,
      u: EFeedback.empty,
      v: EFeedback.empty,
      w: EFeedback.empty,
      x: EFeedback.empty,
      y: EFeedback.empty,
      z: EFeedback.empty,
    },
    row: 0,
    col: 0,
    sol: getRandomSolution(seed).split('') as Tuple5<TAlphabet>,
    msg: EMessages.none,
    fin: false,
  }
}

export function addAplhabet(state: IState, alpha: TAlphabet) {
  const nextState = produce(state, draft => {
    draft.msg = EMessages.none
    if (draft.col === 5) return
    draft.wrd[draft.row][draft.col] = alpha
    draft.col++
  })
  return nextState
}

export function removeAlphabet(state: IState) {
  const nextState = produce(state, draft => {
    draft.msg = EMessages.none
    if (draft.col === 0) return
    draft.col--
    draft.wrd[draft.row][draft.col] = null
  })
  return nextState
}

export function evaluateGuess(
  guess: Tuple5<TAlphabet>,
  solution: Tuple5<TAlphabet>
): TFeedback {
  const feedback = new Array(5).fill(EFeedback.absent) as TFeedback
  const markedGuess = new Array(5).fill(false)
  const markedSolution = new Array(5).fill(false)
  guess.forEach((char, i) => {
    if (char !== solution[i]) return
    feedback[i] = EFeedback.correct
    markedGuess[i] = true
    markedSolution[i] = true
  })
  guess.forEach((char, ci) => {
    if (markedGuess[ci]) return
    for (let si = 0; si < 5; si++) {
      if (markedSolution[si]) continue
      if (char !== solution[si]) continue
      feedback[ci] = EFeedback.present
      markedSolution[si] = true
      break
    }
  })
  return feedback
}

export function updateKeyboard(
  keyboard: TKeyboard,
  guess: Tuple5<TAlphabet>,
  feedback: TFeedback,
): TKeyboard {
  const newKbd = produce(keyboard, draft => {
    guess.forEach((char, i) => {
      draft[char] = Math.max(draft[char], feedback[i])
    })
  })
  return newKbd
}

export function submitGuess(state: IState): IState {
  const nextState = produce(state, draft => {
    if (draft.col !== 5) {
      draft.msg = EMessages.less
      return
    }
  
    if (!isValidWord(draft.wrd[draft.row].join(''))) {
      draft.msg = EMessages.invalid
      return
    }
  
    draft.fbk[draft.row] = evaluateGuess(
      draft.wrd[draft.row] as Tuple5<TAlphabet>,
      draft.sol
    )
    draft.kbd = updateKeyboard(
      draft.kbd,
      draft.wrd[draft.row] as Tuple5<TAlphabet>,
      draft.fbk[draft.row]
    )
  
    if (draft.wrd[draft.row].join('') === draft.sol.join('')) {
      draft.msg = EMessages.win
      draft.fin = true
    }
  
    draft.row++
    draft.col = 0
  })
  return nextState
}
