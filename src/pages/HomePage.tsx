import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const featuredGames = [
  {
    id: 1,
    title: "Cyber Legends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    category: "Action RPG"
  },
  {
    id: 2,
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    category: "Strategy"
  },
  {
    id: 3,
    title: "Medieval Quest",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    category: "Adventure"
  }
];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1920&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              Your Next Gaming Adventure Starts Here
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join millions of players worldwide and discover your next favorite game.
              Stream, compete, and connect with gamers around the globe.
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                Explore Games
              </Button>
              <Button variant="secondary" size="lg">
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGames.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{game.category}</span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="mr-1" />
                    {game.rating}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Users size={48} className="text-purple-500" />
              <div>
                <h3 className="text-3xl font-bold text-white">2M+</h3>
                <p className="text-gray-400">Active Players</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TrendingUp size={48} className="text-purple-500" />
              <div>
                <h3 className="text-3xl font-bold text-white">10K+</h3>
                <p className="text-gray-400">Games Available</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Star size={48} className="text-purple-500" />
              <div>
                <h3 className="text-3xl font-bold text-white">4.8</h3>
                <p className="text-gray-400">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};