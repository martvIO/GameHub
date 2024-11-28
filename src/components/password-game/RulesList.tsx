import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PasswordRule } from '@/types/password-game';

interface RulesListProps {
  rules: PasswordRule[];
  currentPassword: string;
}

export const RulesList: React.FC<RulesListProps> = ({ rules, currentPassword }) => {
  return (
    <div className="space-y-3">
      {rules.map((rule, index) => {
        const isValid = rule.validator(currentPassword);
        
        return (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg',
              isValid ? 'bg-green-500/10' : 'bg-gray-800'
            )}
          >
            <div className="flex-shrink-0">
              {isValid ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
            </div>
            <p className="text-sm text-gray-300">{rule.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};