import { LetterState } from '@/types/wordle';

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export const VALID_WORDS = [
  'react', 'state', 'props', 'hooks', 'redux',
  'query', 'style', 'build', 'debug', 'stack',
  // Add more valid 5-letter words as needed
];

export function getRandomWord(): string {
  return VALID_WORDS[Math.floor(Math.random() * VALID_WORDS.length)];
}

export function checkGuess(guess: string, solution: string): LetterState[] {
  const result: LetterState[] = Array(WORD_LENGTH).fill('absent');
  const solutionArray = [...solution];
  const guessArray = [...guess];

  // First pass: mark correct letters
  guessArray.forEach((letter, i) => {
    if (letter === solutionArray[i]) {
      result[i] = 'correct';
      solutionArray[i] = '#'; // Mark as used
      guessArray[i] = '*'; // Mark as processed
    }
  });

  // Second pass: mark present letters
  guessArray.forEach((letter, i) => {
    if (letter === '*') return; // Skip processed letters
    const solutionIndex = solutionArray.indexOf(letter);
    if (solutionIndex !== -1) {
      result[i] = 'present';
      solutionArray[solutionIndex] = '#'; // Mark as used
    }
  });

  return result;
}

export function isValidWord(word: string): boolean {
  return VALID_WORDS.includes(word.toLowerCase());
}