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
    return {} as IState
}
