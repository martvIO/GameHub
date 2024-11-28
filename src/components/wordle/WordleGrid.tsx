import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WORD_LENGTH, MAX_GUESSES, checkGuess } from '@/lib/wordle-utils';
import type { LetterState } from '@/types/wordle';

interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
}

export const WordleGrid: React.FC<WordleGridProps> = ({
  guesses,
  currentGuess,
  solution,
}) => {
  const empties = Array(MAX_GUESSES - guesses.length - 1).fill('');

  return (
    <div className="grid grid-rows-6 gap-2">
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} solution={solution} isRevealing={true} />
      ))}
      {guesses.length < MAX_GUESSES && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};

interface RowProps {
  guess: string;
  solution: string;
  isRevealing: boolean;
}

const Row: React.FC<RowProps> = ({ guess, solution, isRevealing }) => {
  const states = checkGuess(guess, solution);

  return (
    <div className="grid grid-cols-5 gap-2">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          letter={letter}
          state={states[i]}
          delay={isRevealing ? i * 0.2 : 0}
        />
      ))}
    </div>
  );
};

const CurrentRow: React.FC<{ guess: string }> = ({ guess }) => {
  const letters = guess.split('');
  const emptyCells = Array(WORD_LENGTH - letters.length).fill('');

  return (
    <div className="grid grid-cols-5 gap-2">
      {letters.map((letter, i) => (
        <Cell key={i} letter={letter} state="empty" />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i + letters.length} letter="" state="empty" />
      ))}
    </div>
  );
};

const EmptyRow: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array(WORD_LENGTH).fill('').map((_, i) => (
        <Cell key={i} letter="" state="empty" />
      ))}
    </div>
  );
};

interface CellProps {
  letter: string;
  state: LetterState;
  delay?: number;
}

const Cell: React.FC<CellProps> = ({ letter, state, delay = 0 }) => {
  return (
    <motion.div
      initial={{ rotateX: 0 }}
      animate={state !== 'empty' ? { rotateX: 360 } : {}}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded uppercase',
        {
          'bg-green-500 border-green-600 text-white': state === 'correct',
          'bg-yellow-500 border-yellow-600 text-white': state === 'present',
          'bg-gray-700 border-gray-600 text-white': state === 'absent',
          'border-gray-600': state === 'empty',
        }
      )}
    >
      {letter}
    </motion.div>
  );
};