import process from 'node:process'
import { escape } from 'node:querystring'
import * as wordle from '..'
import chalk, { Chalk } from 'chalk'

const colors: Record<EFeedback, Chalk> = {
  [EFeedback.empty]: chalk.bgGray.whiteBright,
  [EFeedback.absent]: chalk.bgWhite.black,
  [EFeedback.present]: chalk.bgYellow.black,
  [EFeedback.correct]: chalk.bgGreen.black,
}

const keys: TAlphabet[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

const enum inputMap {
  'CtrlC' = '%03',
  'CtrlD' = '%04',
  'CtrlL' = '%0c',
  'Enter' = '%0d',
  'Backspace' = '%7f',
}

process.stdin.setRawMode(true)

let state = wordle.play()
display()

process.stdin.on('data', (data) => {
  const inputCode = escape(data.toString()).toLowerCase()

  // SIGINT
  if (inputCode === inputMap.CtrlC) {
    if (!state.fin) {
      state.msg = EMessages.lose
      console.log(getMessage())
    }
    process.exit(0)
  }

  if (inputCode === inputMap.Enter) play('enter')
  else if (inputCode === inputMap.Backspace) play('bksp')
  else if (inputCode === inputMap.CtrlL) play('new')
  else play(inputCode)

  display()
})

function play(move: string) {
  state = wordle.play(state, move || 'enter')
}

function getGrid() {
  let grid = ''
  state.wrd.forEach((guess, j) => {
    grid += '       '
    guess.forEach((char, i) => {
      grid +=  colors[state.fbk[j][i]](' ' + (char || '-') + ' ')
    })
    grid += colors[0]('\n')
  })
  return grid
}

function getKeyboard() {
  let keyboard = ''
  keys.forEach((row, i) => {
    keyboard += chalk.reset(
      Array(2 * i)
        .fill(' ')
        .join('')
    )
    row.forEach((key) => {
      keyboard += colors[state.kbd[key]](' ' + key + ' ')
    })
    keyboard += colors[0]('\n')
  })
  return keyboard
}

function getMessage() {
  const msg = wordle.getMessageString(state.msg)
  if (state.msg === EMessages.lose) 
    return msg + '\nSolution: ' + chalk.bgWhite.red(' ' + state.sol.join('') + ' ')
  return msg
}

function display() {
  console.clear()
  console.log('            WORDLE')
  console.log('')
  console.log(getGrid())
  console.log('')
  console.log(getKeyboard())
  console.log(getMessage())
  console.log(state.sol.join(''))
}
