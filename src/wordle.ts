import { getNewState, addAplhabet, removeAlphabet, submitGuess } from './utils'

export function play(
  state?: IState,
  action: TAlphabet | 'bksp' | 'enter' | 'new' = 'new'
): IState {
  if (!state || state.fin || action === 'new') {
    return getNewState()
  }

  if (action === 'bksp') {
    state = removeAlphabet(state)
  } else if (action === 'enter') {
    state = submitGuess(state)
  } else if (action.length === 1 && action >= 'a' && action <= 'z') {
    state = addAplhabet(state, action)
  }

  if (!state.fin && state.row === 6) {
    state.fin = true
    state.msg = EMessages.lose
  }

  return state
}
