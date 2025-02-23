import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, errors, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <input
          type="text"
          ref={ref}
          className={cn(
            'w-full px-4 py-3 text-lg rounded-lg border-2 bg-gray-800 text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-purple-500',
            errors && errors.length > 0 ? 'border-red-500' : 'border-gray-700',
            className
          )}
          {...props}
        />
        {errors && errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);