import { getNewState, addAplhabet, removeAlphabet, submitGuess } from './actions'

export function play(state?: IState, action: TAlphabet | 'bksp' | 'enter' | 'new' | string = 'new'): IState {
  if (!state || state.fin || action === 'new') {
    return getNewState()
  }

  if (action === 'bksp') {
    return removeAlphabet(state)
  }

  if (action === 'enter') {
    return submitGuess(state)
  }

  if (action.length === 1 && action >= 'a' && action <= 'z') {
    return addAplhabet(state, action as TAlphabet)
  }

  return state
}
