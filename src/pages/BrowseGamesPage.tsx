import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const games = [
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Guess the hidden word in 6 tries.',
    image: 'https://images.unsplash.com/photo-1632532093325-a541ba5cbbf8?auto=format&fit=crop&w=800&q=80',
    category: 'Word Game',
    rating: 4.8,
  },
  {
    id: 'password-game',
    title: 'The Password Game',
    description: 'Create the perfect password following increasingly challenging rules.',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=800&q=80',
    category: 'Puzzle',
    rating: 4.7,
  },
];

export const BrowseGamesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white dark:text-gray-900 mb-4">
            Browse Games
          </h1>
          <p className="text-gray-400 dark:text-gray-600">
            Discover and play our collection of engaging games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ y: -5 }}
              className="bg-gray-800 dark:bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <Link to={`/games/${game.id}`}>
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">
                    {game.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600 mb-4">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-600">
                      {game.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} className="mr-1" />
                      {game.rating}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};