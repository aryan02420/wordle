// format

// row col msg fin sol kbd wrd fbk

//    bits    start   end   type    value   data  
//    3       0       3     row     001     1
//    3       3       6     col     001     1
//    3       6       9     msg     000     none
//    1       9       10    fin     0       false
//    5       10      15    sol[0]  00010   't'
//    5       15      20    sol[1]  00000   'u'
//    5       20      25    sol[2]  00000   'l'
//    5       25      30    sol[3]  00000   'i'
//    5       30      35    sol[4]  00000   'p'
//    2       35      37    kbd.a   00      empty
//    2       37      39    kbd.b   00      empty
//    2       39      41    kbd.c   00      empty
//    2       41      43    kbd.d   00      empty
//    2       43      45    kbd.e   00      empty
//    2       45      47    kbd.f   00      empty
//    2       47      49    kbd.g   00      empty
//    2       49      51    kbd.h   00      empty
//    2       51      53    kbd.i   00      empty
//    2       53      55    kbd.j   00      empty
//    2       55      57    kbd.k   00      empty
//    2       57      59    kbd.l   00      empty
//    2       59      61    kbd.m   00      empty
//    2       61      63    kbd.n   00      empty
//    2       63      65    kbd.o   00      empty
//    2       65      67    kbd.p   00      empty
//    2       67      69    kbd.q   00      empty
//    2       69      71    kbd.r   00      empty
//    2       71      73    kbd.s   00      empty
//    2       73      75    kbd.t   00      empty
//    2       75      77    kbd.u   00      empty
//    2       77      79    kbd.v   00      empty
//    2       79      81    kbd.w   00      empty
//    2       81      83    kbd.x   00      empty
//    2       83      85    kbd.y   00      empty
//    2       85      87    kbd.z   00      empty
//    5       87      92    wrd0:0  00000   'c'
//    5       92      97    wrd0:1  00000   'r'
//    5       97      102   wrd0:2  00000   'a'
//    5       102     107   wrd0:3  00000   'n'
//    5       107     112   wrd0:4  00000   'e'
//    5       112     117   wrd1:1  00000   'g'
//    2       117     119   fbk0:0  00      absent
//    2       119     121   fbk0:1  00      absent
//    2       121     123   fbk0:2  00      absent
//    2       123     125   fbk0:3  00      absent
//    2       125     127   fbk0:4  00      absent  

// 000 000 000 0 00000 01000 10010 01011 00100 00000000000000000000000000 00000000000000000000000000 000

export function serialize(state: IState): string {
  let str = ''

  // row col msg fin
  str += state.row.toString(2).padStart(3, '0')
  str += state.col.toString(2).padStart(3, '0')
  str += state.msg.toString(2).padStart(3, '0')
  str += Number(state.fin).toString(2)

  // sol
  str += asciiToBin(state.sol.join(''))

  // kbd
  str += Object.entries(state.kbd)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(x => x[1])
    .map(x => x.toString(2).padStart(2, '0'))
    .join('')

  // wrd
  str += asciiToBin(state.wrd.map((chars) => chars.join('')).join(''))

  // fbk
  str += state.fbk
    .slice(0, state.row)
    .map(row => row.map(x => x.toString(2).padStart(2, '0')).join(''))
    .join('')

  return binToB32(str)
}

export function deserialize(str: string): IState {
  const state = {} as IState
  str = b32ToBin(str)
  let cursor = 0

  const consume = (x: number) => {
    return parseInt(str.slice(cursor, cursor += x).padEnd(x, '0'), 2)
  }

  // row col msg fin
  state.row = consume(3)
  state.col = consume(3)
  state.msg = consume(3)
  state.fin = Boolean(consume(1))

  // sol
  state.sol = String.fromCharCode(...new Array(5).fill(null).map(_ => consume(5) + 97)).split('') as Tuple5<TAlphabet>

  // kbd
  state.kbd = Object.fromEntries(
    new Array(26).fill(null)
      .map((_, i) => [String.fromCharCode(i + 97), consume(2)])
  ) as TKeyboard

  // wrd
  const wordsLen = state.row * 5 + state.col
  const words = String.fromCharCode(...new Array(wordsLen).fill(null).map(_ => consume(5) + 97)).split('')
  const nullWords = new Array(30 - wordsLen).fill(null)
  const allWords = [...words, ...nullWords]
  const wrd: string[][] = []
  while (allWords.length) wrd.push(allWords.splice(0, 5))
  state.wrd = wrd as TGuesses

  // fbk
  const feedbacksLen = state.row * 5
  const feedbacks = new Array(feedbacksLen).fill(null).map(_ => consume(2))
  const emptyFeedbacks = new Array(30 - feedbacksLen).fill(EFeedback.empty)
  const allFeedbacks = [...feedbacks, ...emptyFeedbacks]
  const fbk: number[][] = []
  while (allFeedbacks.length) fbk.push(allFeedbacks.splice(0, 5))
  state.fbk = fbk as TFeedbacks

  return state
}


export function asciiToBin(char: string): string {
  if (char.length === 0) return ''
  if (char.length === 1) {
    if (char < 'a' || char > 'z') return ''
    return (char.charCodeAt(0) - 97).toString(2).padStart(5, '0')
  }
  return char.split('').map(c => asciiToBin(c)).join('')
}

export function binToB32(binStr: string): string {
  return binStr
    .match(/[01]{1,5}/g)
    ?.map(num => parseInt(num.padEnd(5, '0'), 2).toString(32))
    .join('') ?? ''
}

export function b32ToBin(b32Str: string): string {
  return b32Str
    .split('')
    .map(num => parseInt(num, 32).toString(2).padStart(5, '0'))
    .join('')
}