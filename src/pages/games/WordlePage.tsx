import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Keyboard } from 'lucide-react';
import { WordleGrid } from '@/components/wordle/WordleGrid';
import { WordleKeyboard } from '@/components/wordle/WordleKeyboard';
import { WORD_LENGTH, MAX_GUESSES, getRandomWord, isValidWord, checkGuess } from '@/lib/wordle-utils';
import type { WordleState, LetterState } from '@/types/wordle';

export const WordlePage = () => {
  const [gameState, setGameState] = useState<WordleState>({
    solution: getRandomWord(),
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    currentRow: 0,
  });

  const [letterStates, setLetterStates] = useState<Map<string, LetterState>>(new Map());

  const addGuess = useCallback((guess: string) => {
    if (guess.length !== WORD_LENGTH) return;
    if (!isValidWord(guess)) {
      toast.error('Not a valid word!');
      return;
    }

    const newGuesses = [...gameState.guesses, guess];
    const states = checkGuess(guess, gameState.solution);
    
    // Update letter states
    states.forEach((state, i) => {
      const letter = guess[i].toLowerCase();
      const currentState = letterStates.get(letter);
      if (state === 'correct' || (state === 'present' && currentState !== 'correct')) {
        letterStates.set(letter, state);
      } else if (!currentState && state === 'absent') {
        letterStates.set(letter, state);
      }
    });

    let status = gameState.gameStatus;
    if (guess === gameState.solution) {
      status = 'won';
      toast.success('Congratulations! You won! 🎉');
    } else if (newGuesses.length === MAX_GUESSES) {
      status = 'lost';
      toast.error(`Game Over! The word was: ${gameState.solution.toUpperCase()}`);
    }

    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      currentGuess: '',
      gameStatus: status,
      currentRow: prev.currentRow + 1,
    }));
  }, [gameState.guesses, gameState.solution, letterStates]);

  const onKey = useCallback((key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === 'Backspace') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    } else if (key === 'Enter') {
      addGuess(gameState.currentGuess);
    } else if (/^[A-Z]$/.test(key) && gameState.currentGuess.length < WORD_LENGTH) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key.toLowerCase(),
      }));
    }
  }, [gameState.currentGuess, gameState.gameStatus, addGuess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        onKey('Backspace');
      } else if (e.key === 'Enter') {
        onKey('Enter');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        onKey(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKey]);

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4">
            <Keyboard className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold text-white">Wordle</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Guess the word in {MAX_GUESSES} tries. Each guess must be a valid {WORD_LENGTH}-letter word.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <WordleGrid
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            solution={gameState.solution}
          />
        </div>

        <WordleKeyboard
          onKey={onKey}
          letterStates={letterStates}
        />
      </div>
    </div>
  );
};