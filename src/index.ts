import { getNewState, checkAndUpdateState } from './utils.js'

export function start(seed: string): IState {
  return getNewState(seed)
}

export function encode(state: IState): string {
  return Buffer.from(JSON.stringify(state), 'binary').toString('base64')
}

export function decode(str: string): IState {
  return JSON.parse(Buffer.from(str, 'base64').toString('binary')) as IState
}

export function action(state: IState, move: TAlphabet | 'bksp' | 'enter'): IState {
  if (move.length === 1 && move >= 'a' && move <= 'z') {

    if (state.col < 5) {
      state.wrd[state.row][state.col] = move as TAlphabet
      state.col++
      state.msg = ""
    }

  } else if (move === 'bksp') {

    state.wrd[state.row][state.col] = null
    state.col = Math.min(0, state.col - 1)
    state.msg = ""

  } else if (move === 'enter') {

    state = checkAndUpdateState(state)

  }

  if (!state.fin && state.row === 6) {
    state.fin = true
    state.msg = state.sol.join('').toUpperCase()
  }

  return state
}
