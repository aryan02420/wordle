export function serialize(state: IState): string {
  let str = ''

  str += state.row
  str += state.col
  str += Number(state.fin)
  str += state.msg
  str += state.sol.join('')

  str += Object.entries(state.kbd)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((x) => x[1])
    .join('')

  str += state.wrd.map((chars) => chars.join('')).join('')

  str += state.fbk
    .slice(0, state.row)
    .map((chars) => chars.join(''))
    .join('')

  return ascToHex(str)
}

export function deserialize(str: string): IState {
  const state = {} as IState
  str = hexToAsc(str)

  state.row = +str[0]
  state.col = +str[1]
  state.fin = Boolean(+str[2])
  state.msg = +str[3]
  state.sol = str.slice(4, 9).split('') as Tuple5<TAlphabet>

  state.kbd = Object.fromEntries(
    str
      .slice(9, 35)
      .split('')
      .map((x) => +x)
      .map((x, i) => {
        return [String.fromCharCode(i + 97), x]
      })
  ) as TKeyboard

  const wordsLen = state.row * 5 + state.col
  const words = [
    ...str.slice(35, 35 + wordsLen).split(''),
    ...new Array(30 - wordsLen).fill(null),
  ]
  const wrd: string[][] = []
  while (words.length) wrd.push(words.splice(0, 5))
  state.wrd = wrd as TGuesses

  const feedbacksLen = state.row * 5
  const feedbacks = [
    ...str
      .slice(35 + wordsLen, 35 + wordsLen + feedbacksLen)
      .split('')
      .map((x) => +x),
    ...new Array(30 - feedbacksLen).fill(EFeedback.empty),
  ]
  const fbk: number[][] = []
  while (feedbacks.length) fbk.push(feedbacks.splice(0, 5))
  state.fbk = fbk as TFeedbacks

  return state
}

// CONVERSION TABLE

//    char   code       dec     actual
//    0	     00000	    0       0
//    1	     00001	    1       1
//    2	     00010	    2       2
//    3	     00011	    3       3
//    4	     00100	    4       4
//    5	     00101	    5       5
//    a	     00110	    6       97
//    b	     00111	    7       98
//    c	     01000	    8       99
//    d	     01001	    9       100
//    e	     01010	    10      101
//    f	     01011	    11      102
//    g	     01100	    12      103
//    h	     01101	    13      104
//    i	     01110	    14      105
//    j	     01111	    15      106
//    k	     10000	    16      107
//    l	     10001	    17      108
//    m	     10010	    18      109
//    n	     10011	    19      110
//    o	     10100	    20      111
//    p	     10101	    21      112
//    q	     10110	    22      113
//    r	     10111	    23      114
//    s	     11000	    24      115
//    t	     11001	    25      116
//    u	     11010	    26      117
//    v	     11011	    27      118
//    w	     11100	    28      119
//    x	     11101	    29      120
//    y	     11110	    30      121
//    z	     11111	    31      122

export function ascToBin5(str: string): string {
  return str
    .split('')
    .map((s) => {
      if (s >= '0' && s <= '5') {
        return (+s).toString(2).padStart(5, '0')
      } else if (s >= 'a' && s <= 'z') {
        return (s.charCodeAt(0) - 91).toString(2).padStart(5, '0')
      } else {
        throw Error(`invalid character: ${s}`)
      }
    })
    .join('')
}

export function bin5ToAsc(str: string): string {
  return (
    str
      .match(/[01]{5}/g)
      ?.map((c) => {
        let d = parseInt(c, 2)
        if (d <= 5) {
          return String(d)
        } else if (d >= 6) {
          return String.fromCharCode(d + 91)
        }
      })
      .join('') ?? ''
  )
}

export function bin5ToHex(str: string): string {
  return (
    str
      .match(/[01]{1,4}/g)
      ?.map((b) => {
        return parseInt(b.padEnd(4, '0'), 2).toString(16)
      })
      .join('') ?? ''
  )
}

export function hexToBin5(str: string): string {
  str = str
    .split('')
    .map((h) => {
      return parseInt(h, 16).toString(2).padStart(4, '0')
    })
    .join('')
  return str.slice(0, str.length - (str.length % 5))
}

export function ascToHex(str: string): string {
  return bin5ToHex(ascToBin5(str))
}

export function hexToAsc(str: string): string {
  return bin5ToAsc(hexToBin5(str))
}
