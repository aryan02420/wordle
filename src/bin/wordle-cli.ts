import process from 'process'
import { escape } from 'querystring'
import * as wordle from '../'
import chalk, { Chalk } from 'chalk'

const colors: Record<EFeedback, Chalk> = {
  0: chalk.bgGray.whiteBright,
  1: chalk.bgWhite.black,
  2: chalk.bgYellow.black,
  3: chalk.bgGreen.black,
}

const keys = [
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
    process.exit(0)
  }

  if (inputCode === inputMap.Enter) play('enter')
  else if (inputCode === inputMap.Backspace) play('bksp')
  else if (inputCode === inputMap.CtrlL) play('new')
  else play(inputCode)

  display()
})

function play(move: string) {
  // @ts-ignore
  state = wordle.play(state, move || 'enter')
}

function getGrid() {
  let grid = ''
  state.wrd.forEach((guess, j) => {
    guess.forEach((char, i) => {
      grid += colors[state.fbk[j][i]](' ' + (char || '_') + ' ')
    })
    grid += colors[0]('\n')
  })
  grid += colors[0]('               ')
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
      // @ts-ignore
      keyboard += colors[state.kbd[key]](' ' + key + ' ')
    })
    keyboard += colors[0]('\n')
  })
  return keyboard
}

function getMessage() {
  if (state.msg === EMessages.lose) return chalk.bgWhite.red(state.sol.join(''))
  return wordle.getMessageString(state.msg)
}

function display() {
  console.clear()
  console.log('WORDLE')
  console.log('')
  console.log(getGrid())
  console.log('')
  console.log(getKeyboard())
  console.log(getMessage())
}
