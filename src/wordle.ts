import { getNewState, addAplhabet, removeAlphabet, submitGuess } from './utils'
import { serialize, deserialize } from './encoder'

export function start(seed: string): IState {
  return getNewState(seed)
}

export function encode(state: IState): string {
  return serialize(state)
}

export function decode(str: string): IState {
  return deserialize(str)
}

export function action(state: IState, move: TAlphabet | 'bksp' | 'enter'): IState {

  if (move === 'bksp') {
    state = removeAlphabet(state)
  } else if (move === 'enter') {
    state = submitGuess(state)
  } else {
    state = addAplhabet(state, move)
  }

  if (!state.fin && state.row === 6) {
    state.fin = true
    state.msg = EMessages.lose
  }

  return state
}
