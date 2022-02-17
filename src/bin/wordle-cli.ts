#!/usr/bin/env node

import process from 'process'
import * as wordle from '../index.js'
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
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

let state = wordle.play()
display()

process.stdin.on('data', (data) => {
  play(data.toString().trim())
  display()
})

function play(move: string) {
  // @ts-ignore
  state = wordle.play(state, move || 'enter')
}

function display() {
  console.clear()
  console.log('WORDLE')

  let grid = ''
  state.wrd.forEach((guess, j) => {
    guess.forEach((char, i) => {
      grid += colors[state.fbk[j][i]](' ' + (char || '_') + ' ')
    })
    grid += colors[0]('\n')
  })
  grid += colors[0]('               ')
  console.log(grid)

  console.log('')

  let keyboard = ''
  keys.forEach((row, i) => {
    keyboard += chalk.reset(Array(2 * i).fill(' ').join(''))
    row.forEach(key => {
      // @ts-ignore
      keyboard += colors[state.kbd[key]](' ' + key + ' ')
    })
    keyboard += colors[0]('\n')
  })
  console.log(keyboard)

  if (state.msg !== EMessages.lose)
    console.log(wordle.getMessageString(state.msg))
  else
    console.log(chalk.bgWhite.red(state.sol.join('')))
}
