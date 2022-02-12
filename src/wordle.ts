import { getNewState, addAplhabet, removeAlphabet, checkAndUpdateState } from './utils'

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

  if (move === 'bksp') {
    state = removeAlphabet(state)
  } else if (move === 'enter') {
    state = checkAndUpdateState(state)
  } else {
    state = addAplhabet(state, move)
  }

  if (!state.fin && state.row === 6) {
    state.fin = true
    state.msg = state.sol.join('').toUpperCase()
  }

  return state
}
