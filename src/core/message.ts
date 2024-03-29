export const messages: Record<EMessages, string[]> = {
  [EMessages.none]: [''],
  [EMessages.less]: [
    'not enough characters',
    'guess must be a five letter word',
  ],
  [EMessages.invalid]: ['not a valid word', 'word not valid'],
  [EMessages.win]: ['Great', 'Awesome', 'You Win', 'Genius'],
  [EMessages.lose]: ['Loser', 'You Suck!', 'Better Luck next tym.'],
}

export function getMessageString(type: EMessages): string {
  const msgs = messages[type]
  const index = Math.floor(Math.random() * msgs.length)
  return msgs[index]
}
