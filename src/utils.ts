import { getRandomSolution, isValidWord } from './words.js'

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
        msg: '',
        fin: false,
    }
}

export function checkAndUpdateState(state: IState): IState {

    const input_word = state.wrd[state.row].join('')

    if (input_word.length !== 5) {
        state.msg = 'Not enough letters'
        return state
    }
    
    if (isValidWord(input_word)) {
        state.msg = 'Not a word'
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

    if (input_word === state.sol.join('')) {
        state.msg = 'Great!!!'
        state.fin = true
        return state
    }

    return state
}
