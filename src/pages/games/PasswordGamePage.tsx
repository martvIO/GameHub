import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PasswordInput } from '@/components/password-game/PasswordInput';
import { RulesList } from '@/components/password-game/RulesList';
import { passwordRules } from '@/lib/password-rules';
import { Button } from '@/components/ui/Button';

export const PasswordGamePage = () => {
  const [password, setPassword] = useState('');
  const [activeRules, setActiveRules] = useState(passwordRules.slice(0, 1));
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = useCallback((value: string) => {
    const newErrors: string[] = [];
    
    activeRules.forEach(rule => {
      if (!rule.validator(value)) {
        newErrors.push(rule.errorMessage);
      }
    });
    
    setErrors(newErrors);
    
    if (newErrors.length === 0 && activeRules.length < passwordRules.length) {
      const nextRule = passwordRules[activeRules.length];
      setActiveRules(prev => [...prev, nextRule]);
      toast.success('New rule unlocked!', {
        icon: '🎉',
        duration: 2000,
      });
    }
  }, [activeRules]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4">
            <Lock className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold text-white">The Password Game</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Create a password that meets all the requirements. But be careful - new rules will appear as you progress!
          </p>
        </motion.div>

        <div className="space-y-6">
          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password..."
            errors={errors}
          />

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Current Rules</h2>
            <RulesList rules={activeRules} currentPassword={password} />
          </div>

          {activeRules.length === passwordRules.length && errors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Submit Final Password
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};