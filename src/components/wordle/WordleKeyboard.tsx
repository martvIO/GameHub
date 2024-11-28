import React from 'react';
import { cn } from '@/lib/utils';
import type { KeyboardKey, LetterState } from '@/types/wordle';

interface WordleKeyboardProps {
  onKey: (key: string) => void;
  letterStates: Map<string, LetterState>;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

export const WordleKeyboard: React.FC<WordleKeyboardProps> = ({
  onKey,
  letterStates,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5">
          {row.map((key) => {
            const state = letterStates.get(key.toLowerCase()) || 'empty';
            const width = key.length > 1 ? 'w-16' : 'w-10';
            
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={cn(
                  'h-14 rounded font-bold uppercase transition-colors',
                  width,
                  {
                    'bg-green-500 text-white': state === 'correct',
                    'bg-yellow-500 text-white': state === 'present',
                    'bg-gray-700 text-white': state === 'absent',
                    'bg-gray-600 text-white': state === 'empty',
                    'text-sm': key.length > 1,
                  }
                )}
              >
                {key === 'Backspace' ? '←' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};