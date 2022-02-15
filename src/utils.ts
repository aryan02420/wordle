import { getRandomSolution, isValidWord } from './words'

export function getNewState(seed: any): IState {
    return {
        wrd: [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
        ],
        fbk: [
            [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
            [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
            [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
            [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
            [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
            [EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty, EFeedback.empty],
        ],
        kbd: {
            a: EFeedback.empty,
            b: EFeedback.empty,
            c: EFeedback.empty,
            d: EFeedback.empty,
            e: EFeedback.empty,
            f: EFeedback.empty,
            g: EFeedback.empty,
            h: EFeedback.empty,
            i: EFeedback.empty,
            j: EFeedback.empty,
            k: EFeedback.empty,
            l: EFeedback.empty,
            m: EFeedback.empty,
            n: EFeedback.empty,
            o: EFeedback.empty,
            p: EFeedback.empty,
            q: EFeedback.empty,
            r: EFeedback.empty,
            s: EFeedback.empty,
            t: EFeedback.empty,
            u: EFeedback.empty,
            v: EFeedback.empty,
            w: EFeedback.empty,
            x: EFeedback.empty,
            y: EFeedback.empty,
            z: EFeedback.empty,
        },
        row: 0,
        col: 0,
        sol: getRandomSolution(seed).split('') as Tuple5<TAlphabet>,
        msg: EMessages.none,
        fin: false,
    }
}

export function addAplhabet(state: IState, alpha: TAlphabet) {
    state.msg = EMessages.none
    if (state.col === 5) return state
    state.wrd[state.row][state.col] = alpha
    state.col++
    return state
}

export function removeAlphabet(state: IState) {
    state.msg = EMessages.none
    if (state.col === 0) return state
    state.col--
    state.wrd[state.row][state.col] = null
    return state
}

export function evaluateGuess(guess: Tuple5<TAlphabet>, solution: Tuple5<TAlphabet>): TFeedback {
    const feedback = new Array(5).fill(EFeedback.absent) as TFeedback
    const markedGuess = new Array(5).fill(false)
    const markedSolution = new Array(5).fill(false)
    guess.forEach((char, i) => {
        if (char !== solution[i]) return
        feedback[i] = EFeedback.correct
        markedGuess[i] = true
        markedSolution[i] = true
    })
    guess.forEach((char, ci) => {
        if (markedGuess[ci]) return
        for (let si = 0; si < 5; si++) {
            if (markedSolution[si]) continue
            if (char !== solution[si]) continue
            feedback[ci] = EFeedback.present
            markedSolution[si] = true
            break
        }
    })
    return feedback
}

export function submitGuess(state: IState): IState {

    if (state.col !== 5) {
        state.msg = EMessages.less
        return state
    }

    if (!isValidWord(state.wrd[state.row].join(''))) {
        state.msg = EMessages.invalid
        return state
    }

    state.wrd[state.row].forEach((alpha, i) => {

        if (state.sol.findIndex(val => val === alpha) === -1) {
            state.fbk[state.row][i] = EFeedback.absent
            state.kbd[alpha!] = Math.max(EFeedback.absent, state.kbd[alpha!])
        } else {
            state.fbk[state.row][i] = EFeedback.present
            state.kbd[alpha!] = Math.max(EFeedback.present, state.kbd[alpha!])
        }

        if (alpha === state.sol[i]) {
            state.fbk[state.row][i] = EFeedback.correct
            state.kbd[alpha!] = Math.max(EFeedback.correct, state.kbd[alpha!])
        }

    })

    if (state.wrd[state.row].join('') === state.sol.join('')) {
        state.msg = EMessages.win
        state.fin = true
        return state
    }

    state.row++
    state.col = 0
    return state
}
