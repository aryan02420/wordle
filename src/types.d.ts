type TAlphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' |
    'g' | 'h' | 'i' | 'j' | 'k' | 'l' |
    'm' | 'n' | 'o' | 'p' | 'q' | 'r' |
    's' | 't' | 'u' | 'v' | 'w' | 'x' |
    'y' | 'z'
type Tuple5<T> = [T, T, T, T, T]
type Tuple6<T> = [T, T, T, T, T, T]
type TWord = Tuple5<TAlphabet | null>
type TGuesses = Tuple6<TWord>
enum EFeedback {
    empty = 0,
    absent,
    present,
    correct
}
type TFeedback = Tuple5<EFeedback>
type TFeedbacks = Tuple6<TFeedback>
type TKeyboard = Record<TAlphabet, EFeedback>
interface IState {
    wrd: TGuesses
    fbk: TFeedbacks
    kbd: TKeyboard
    row: number
    col: number
    sol: Tuple5<TAlphabet>
    msg: string
    fin: boolean
}