declare function play(state?: IState, action?: TAlphabet | 'bksp' | 'enter' | 'new' | string): IState;

declare function serialize(state: IState): string;
declare function deserialize(str: string): IState;

declare function getMessageString(type: EMessages): string;

export { deserialize, getMessageString, play, serialize };
